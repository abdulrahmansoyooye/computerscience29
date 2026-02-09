# CSC29 Learning Portal

A premium, modern, and high-performance learning materials platform designed exclusively for Computer Science students at csc29.

## 🚀 Features

- **Secured Access**: Protected by Matric Number and a shared departmental password.
- **Rich Library**: Organized by course, level, and category (Lecture Notes, Past Questions, etc.).
- **Focused Reading View**: Calm, academic-focused reading experience for long study sessions.
- **Sanity CMS**: Fully structured content backend for easy updates by admins/reps.
- **Premium UI**: Custom-designed with a focus on intelligence, structure, and calm confidence.
- **Responsive**: Seamless experience across mobile, tablet, and desktop.

## 🛠 Tech Stack

- **Frontend**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 & Framer Motion
- **Backend/CMS**: Sanity.io
- **Icons**: Lucide React
- **Typography**: Inter (Sans) & Playfair Display (Serif)

## 📦 Setup & Installation

### 1. Clone & Install
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file based on `.env.example`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-06
SANITY_API_READ_TOKEN=your_token
SHARED_ACCESS_PASSWORD=csc29-portal
```

### 3. Sanity Setup
1. Go to [sanity.io/manage](https://sanity.io/manage) and create a new project.
2. Update your `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Run the development server: `npm run dev`.
4. Access the Studio at `/admin` to begin adding content.

## 🔐 Access Rules
- **Student**: Any student with a valid matric number and the departmental password.
- **Admin**: Any student with access to the Sanity Studio (via Sanity account).

## 🎨 Design System
- **Primary Color**: Deep Indigo/Slate (`#1e293b`)
- **Accent**: Soft Blue (`#3b82f6`)
- **Background**: Slate 50 (Light) / Slate 950 (Dark)
- **Typography**: Focused on readability and academic elegance.

---
Built with passion for the future of Computer Science by Antigravity.
