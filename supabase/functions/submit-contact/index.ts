import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown; // Honeypot field for bot trapping
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Only POST is accepted.' }),
      {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    let body: ContactPayload;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON payload received.' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 1. Honeypot check for automated bot spam
    if (body.website && typeof body.website === 'string' && body.website.trim().length > 0) {
      console.warn('[Security] Bot detected via honeypot field.');
      return new Response(
        JSON.stringify({ success: true, message: 'Message received.' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 2. Validate and sanitize fields
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    const validationErrors: Record<string, string> = {};

    if (!name || name.length < 1) {
      validationErrors.name = 'Please provide your name.';
    } else if (name.length > 100) {
      validationErrors.name = 'Name must be under 100 characters.';
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!email) {
      validationErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(email) || email.length > 255) {
      validationErrors.email = 'Please provide a valid email address.';
    }

    if (!subject || subject.length < 1) {
      validationErrors.subject = 'Please provide a subject line.';
    } else if (subject.length > 200) {
      validationErrors.subject = 'Subject must be under 200 characters.';
    }

    if (!message || message.length < 10) {
      validationErrors.message = 'Message must be at least 10 characters.';
    } else if (message.length > 5000) {
      validationErrors.message = 'Message must be under 5000 characters.';
    }

    if (Object.keys(validationErrors).length > 0) {
      return new Response(
        JSON.stringify({
          error: 'Validation failed.',
          details: validationErrors,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // 3. Environment Secrets
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[Configuration Error] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
      return new Response(
        JSON.stringify({ error: 'Server configuration error: Database credentials unavailable.' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    });

    // 4. Abuse protection: simple rate limit per email (1 submission per 20 seconds)
    try {
      const twentySecondsAgo = new Date(Date.now() - 20000).toISOString();
      const { data: recentSubmissions } = await supabase
        .from('contact_messages')
        .select('id, created_at')
        .eq('email', email)
        .gte('created_at', twentySecondsAgo)
        .limit(1);

      if (recentSubmissions && recentSubmissions.length > 0) {
        return new Response(
          JSON.stringify({
            error: 'Rate limit exceeded: A transmission from this address was recently received. Please wait 20 seconds before resubmitting.',
          }),
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    } catch (rateLimitErr) {
      console.warn('[Abuse Protection] Rate check bypassed due to check error:', rateLimitErr);
    }

    // 5. Secure database persistence using service-role privileged client
    const { data: insertedRow, error: insertError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        subject,
        message,
      })
      .select('id, created_at')
      .single();

    if (insertError || !insertedRow) {
      console.error('[Database Error] Failed to persist contact message:', insertError?.message || insertError);
      return new Response(
        JSON.stringify({
          error: 'Database error: Unable to store your transmission securely. Please try again later.',
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.info(`[Database Success] Message ${insertedRow.id} saved for ${email}.`);

    // 6. Resend Email Dispatch
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const contactToEmail = Deno.env.get('CONTACT_TO_EMAIL') || 'aryanpandey2675@gmail.com';
    const contactFromEmail = Deno.env.get('CONTACT_FROM_EMAIL') || 'onboarding@resend.dev';

    let emailSent = false;
    let emailWarning: string | null = null;
    let resendMessageId: string | null = null;

    if (!resendApiKey) {
      emailWarning = 'Notification skipped: RESEND_API_KEY is not configured in Supabase secrets.';
      console.warn(`[Resend Warning] ${emailWarning}`);
    } else {
      try {
        const formattedDate = new Date().toUTCString();

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Contact Transmission</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07080d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f1f5f9;">
  <div style="max-width: 600px; margin: 30px auto; background-color: #0d111c; border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(14, 165, 233, 0.3);">
    
    <!-- Cyberpunk Header -->
    <div style="background: linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(139, 92, 246, 0.2)); padding: 24px 28px; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
      <div style="display: inline-block; padding: 4px 10px; background-color: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.4); border-radius: 999px; color: #38bdf8; font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">
        Direct Portfolio Transmission
      </div>
      <h1 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: 800; letter-spacing: -0.02em;">
        ${escapeHtml(subject)}
      </h1>
      <p style="margin: 4px 0 0; font-size: 12px; color: #94a3b8; font-family: monospace;">
        Timestamp: ${formattedDate}
      </p>
    </div>

    <!-- Sender Metadata Card -->
    <div style="padding: 24px 28px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 12px; background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px 0 0 8px; width: 30%; color: #94a3b8; font-size: 12px; font-family: monospace; text-transform: uppercase;">
            Sender Name
          </td>
          <td style="padding: 10px 14px; background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 0 8px 8px 0; color: #ffffff; font-weight: 600; font-size: 14px;">
            ${escapeHtml(name)}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 8px 0 0 8px; width: 30%; color: #94a3b8; font-size: 12px; font-family: monospace; text-transform: uppercase;">
            Contact Email
          </td>
          <td style="padding: 10px 14px; background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 0 8px 8px 0; color: #38bdf8; font-size: 14px; font-family: monospace;">
            <a href="mailto:${escapeHtml(email)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(email)}</a>
          </td>
        </tr>
      </table>

      <!-- Message Content -->
      <div style="margin-bottom: 12px; color: #94a3b8; font-size: 12px; font-family: monospace; text-transform: uppercase; letter-spacing: 0.05em;">
        Message Body
      </div>
      <div style="padding: 20px; background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; font-size: 14px; line-height: 1.7; color: #e2e8f0; white-space: pre-wrap; font-family: inherit;">
${escapeHtml(message)}
      </div>

      <!-- Action Footer -->
      <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center;">
        <a href="mailto:${escapeHtml(email)}?subject=Re:%20${encodeURIComponent(subject)}" style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #0ea5e9, #8b5cf6); color: #ffffff; text-decoration: none; font-weight: 600; font-size: 13px; border-radius: 10px;">
          Reply to ${escapeHtml(name)}
        </a>
        <span style="font-size: 11px; color: #64748b; font-family: monospace;">
          Database Record: ${insertedRow.id}
        </span>
      </div>
    </div>
  </div>
</body>
</html>
        `.trim();

        const emailText = `
New Transmission from Portfolio Contact Form:
---------------------------------------------
From: ${name} (${email})
Subject: ${subject}
Date: ${formattedDate}
Message ID: ${insertedRow.id}

Message:
${message}

---------------------------------------------
Reply directly to: ${email}
        `.trim();

        const resendPayload = {
          from: contactFromEmail,
          to: [contactToEmail],
          reply_to: email,
          subject: `[Portfolio Contact] ${subject} - ${name}`,
          html: emailHtml,
          text: emailText,
        };

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify(resendPayload),
        });

        const resendData = await resendRes.json();

        if (resendRes.ok && resendData?.id) {
          emailSent = true;
          resendMessageId = resendData.id;
          console.info(`[Resend Success] Email accepted by Resend with ID: ${resendData.id}`);
        } else {
          emailSent = false;
          const detail = resendData?.message || resendRes.statusText || 'Unknown error';
          emailWarning = `Message saved to database, but Resend email dispatch failed: ${detail}`;
          console.error(`[Resend Error] Status ${resendRes.status}:`, resendData);
        }
      } catch (err: unknown) {
        emailSent = false;
        const errMessage = err instanceof Error ? err.message : String(err);
        emailWarning = `Message saved to database, but notification email dispatch failed.`;
        console.error('[Resend Exception] Error while sending email:', errMessage);
      }
    }

    // 7. Return detailed response
    return new Response(
      JSON.stringify({
        success: true,
        messageId: insertedRow.id,
        emailSent,
        warning: emailWarning,
        message: emailSent
          ? 'Message transmitted and saved successfully. Email notification sent.'
          : 'Message saved successfully to the database. Notification delivery is pending.',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : 'Internal server error';
    console.error('[Fatal Error] Unhandled exception in submit-contact:', errMessage);
    return new Response(
      JSON.stringify({ error: 'Internal system error processing contact transmission.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
