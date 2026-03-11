# Whimbrel Solution

Premium software house website — Islamabad, Pakistan. Built with Next.js, TypeScript, and Tailwind CSS.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI:** Framer Motion, Lucide React
- **Deploy:** Netlify

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and add your keys (optional, for AI agent):

- `GEMINI_API_KEY` — Google Gemini (fallback for chat)
- `ANTHROPIC_API_KEY` — Claude (primary for chat)
- `OPENAI_API_KEY` — OpenAI (fallback)

Without these, the site works; the AI agent uses built-in replies only.

## Scripts

- `npm run dev` — Development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Deploy (Netlify)

- Build command: `npm run build`
- Publish directory: `.next`
- Use the Netlify Next.js plugin (see `netlify.toml`).

## Project structure

- `app/` — Routes and pages (App Router)
- `components/` — UI and sections
- `data/` — Blog, services, and static data
- `lib/` — Utilities, constants, SEO
