# Portfolio Website

A personal portfolio application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. It showcases work experience, skills, projects, education, certifications, and a contact form for direct messaging.

## Overview

This portfolio is designed for a clean, responsive presentation across desktop and mobile. The site includes:

- Hero section with personal introduction and call-to-action
- About section with summary and key strengths
- Experience timeline for professional history
- Skills section with categorized technical abilities
- Projects, certifications, and education highlights
- Contact form integrated via API route
- Light/Dark theme support and animated transitions

## Live Preview

Run locally and open the browser at:

```bash
http://localhost:3000
```

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Build the project for production:

```bash
npm run build
npm start
```

## Project Structure

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Reusable UI components for each portfolio section
- `public/` - Static assets such as images, logos, and resume file
- `tailwind.config.ts` - Tailwind CSS configuration
- `next.config.js` - Next.js configuration

## Customization

- Add or replace `public/profile.jpg` or `public/profile.png` to update the hero image.
- Add `public/resume.pdf` to enable the resume download link.
- Update source content in `src/components/` to edit sections such as About, Experience, Education, and Contact.

## Deployment

This app can be deployed on platforms like Vercel or Netlify.

1. Connect the repository to your deployment provider.
2. Build command: `npm run build`
3. Output directory: default for Next.js App Router

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Resend (email integration)

## Notes

- The contact form uses a serverless route at `src/app/api/contact/route.ts`.
- Keep any personal and resume assets inside the `public/` directory.

---

Created as a clean, modern portfolio for presenting skills and experience in a professional format.
