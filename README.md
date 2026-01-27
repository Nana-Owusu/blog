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
# Optional but recommended for visual editing/live preview
NEXT_PUBLIC_SANITY_STUDIO_URL="http://localhost:3333"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
# Optional, only required for private datasets
SANITY_API_TOKEN="your_read_token"
# Required for draft mode + live preview
SANITY_VIEWER_TOKEN="your_viewer_token"
```

### Studio setup

Use Sanity Studio to manage content. You can copy the schema files from
`sanity/schemas` into your Studio project:

- `sanity/schemas/post.ts`
- `sanity/schemas/author.ts`
- `sanity/schemas/category.ts`

Once you publish posts in Sanity, the site will render them automatically.

## Draft mode + live updates

This project uses Sanity's live content API for real-time updates and Next.js
draft mode for previewing unpublished content.

1. Create a Viewer token in Sanity (read access is enough).
2. Add `SANITY_VIEWER_TOKEN` to `.env.local`.
3. Start the site, then visit `/api/draft-mode/enable` to enter preview mode.
4. Use the floating "Exit preview" button to leave draft mode.

### Studio Presentation button

Open the Sanity Studio at `/studio` and use the Presentation tool to open the
site preview. It will automatically enable draft mode using
`/api/draft-mode/enable`.

## Project structure

- `app/` Next.js App Router pages
- `components/` UI building blocks
- `lib/` Sanity client + queries
- `sanity/` schema templates for your Studio
