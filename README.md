# Signal Dispatch

A news-style blog built with Next.js and powered by Sanity for content editing.

## Getting started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

## Connect Sanity

This site reads posts from Sanity. Add a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-01-01"
# Optional, only required for private datasets
SANITY_API_TOKEN="your_read_token"
```

### Studio setup

Use Sanity Studio to manage content. You can copy the schema files from
`sanity/schemas` into your Studio project:

- `sanity/schemas/post.ts`
- `sanity/schemas/author.ts`
- `sanity/schemas/category.ts`

Once you publish posts in Sanity, the site will render them automatically.

## Project structure

- `app/` Next.js App Router pages
- `components/` UI building blocks
- `lib/` Sanity client + queries
- `sanity/` schema templates for your Studio
