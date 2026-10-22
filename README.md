# Interactive 3D Developer Portfolio

A modern, responsive, high-performance developer portfolio built for a B.Tech Computer Science student applying for Software Development Engineer (SDE) internships and placements.

Featuring a dark aesthetic with electric-blue and violet accents, an interactive Three.js 3D hero visual with mouse-parallax, 3D tilt project cards, deep-dive architectural modals, verified technical skills, and downloadable resume support.

---

## ⚡ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom glassmorphism, glow utilities & dark obsidian theme
- **3D Graphics**: [Three.js](https://threejs.org/) (wireframe icosahedron, glowing core, orbital rings, particle constellation with mouse parallax & `prefers-reduced-motion` detection)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG brand icons
- **Version Control**: Git & GitHub
- **Deployment**: Free static hosting ready for [Vercel](https://vercel.com/)

---

## 🚀 Quick Start (Run Locally)

### 1. Clone or Open Workspace
```bash
cd "c:\Users\Aryan\OneDrive\Documents\MyPortfolio"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Bundle Locally
```bash
npm run preview
```

---

## 📁 File Structure

```text
MyPortfolio/
├── public/
│   ├── logo.png                 # Dark-mode browser tab logo
│   └── resume.pdf               # Downloadable sample resume PDF
├── src/
│   ├── assets/                  # Static assets & icons
│   ├── components/
│   │   ├── AboutSection.tsx     # B.Tech student background & engineering pillars
│   │   ├── ContactSection.tsx   # Interactive contact form & direct channels
│   │   ├── EducationSection.tsx # Academic timeline with coursework badges
│   │   ├── Footer.tsx           # Footer with social links & back-to-top button
│   │   ├── Hero3DCanvas.tsx     # Three.js 3D interactive wireframe & particles
│   │   ├── HeroSection.tsx      # Main hero with status badge & CTA buttons
│   │   ├── Icons.tsx            # Crisp SVG brand icons (GitHub, LinkedIn)
│   │   ├── Navbar.tsx           # Glassmorphism header with active section tracking
│   │   ├── ProjectModal.tsx     # Deep-dive architecture & features modal
│   │   ├── ProjectsSection.tsx  # 3D tilt project cards with category filters
│   │   ├── ResumeSection.tsx    # Resume overview, download, & fast snapshot
│   │   └── SkillsSection.tsx    # Categorized skills & Java/DSA spotlight card
│   ├── data/
│   │   └── portfolioData.ts     # ⭐️ CENTRAL FILE: All personal & project details
│   ├── App.tsx                  # Main layout container
│   ├── index.css                # Tailwind CSS v4 design tokens & keyframes
│   └── main.tsx                 # React DOM root entry
├── index.html                   # HTML5 shell with SEO metadata & Google Fonts
├── vite.config.ts               # Vite bundler configuration & code splitting
└── tsconfig.json                # TypeScript compiler settings
```

---

## ✏️ Details You Must Fill In

All personal details, URLs, and placeholders are centralized in a single file:  
👉 [`src/data/portfolioData.ts`](file:///c:/Users/Aryan/OneDrive/Documents/MyPortfolio/src/data/portfolioData.ts)

Update the following keys to match your information:

| Section | Field in `portfolioData.ts` | Current Placeholder Value | What to Enter |
|---|---|---|---|
| **Personal** | `personal.name` | `"Aryan Pandey"` | Your actual full name |
| **Personal** | `personal.email` | `"aryan.dev.contact@example.com"` | Your active contact email |
| **Personal** | `personal.github` | `"https://github.com/aryanPandey-dev"` | Your GitHub profile link |
| **Personal** | `personal.linkedin` | `"https://linkedin.com/in/aryan-Pandey-dev"` | Your LinkedIn profile URL |
| **Personal** | `personal.location` | `"India [Update City/State]"` | Your city and state/country |
| **Education** | `institution` | `"[Your University / Institute Name]"` | Your university/college name |
| **Education** | `duration` | `"2023 - 2027 (Expected)"` | Your actual enrollment years |
| **Education** | `cgpaOrGrade` | `"Current CGPA: 8.5 / 10.0"` | Your current CGPA or percentage |
| **Resume** | `public/resume.pdf` | Built-in placeholder PDF | Replace with your real PDF file named `resume.pdf` |

---

## 🌐 Deployment Instructions

### Option A: Deploy with GitHub & Vercel (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com/) and log in with your GitHub account.
   - Click **"Add New..."** > **"Project"**.
   - Select your GitHub repository from the list.
   - Vercel automatically detects **Vite** and sets:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **Deploy**. Your site will be live on a free `.vercel.app` domain with automated SSL.

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
```

---

## 📬 Contact Form Service (Optional)

The contact form includes built-in client validation and simulated instant feedback. To receive actual emails submitted through the form without creating a backend:
1. Create a free form endpoint on [Web3Forms](https://web3forms.com/) or [Formspree](https://formspree.io/).
2. Create a `.env` file in the root of `MyPortfolio/`:
   ```env
   VITE_CONTACT_FORM_ENDPOINT=https://api.web3forms.com/submit
   ```
3. The form will automatically POST submitted messages to your endpoint.
