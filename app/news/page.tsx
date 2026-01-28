import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PostCard } from "@/components/PostCard";
import { getLatestPosts } from "@/lib/sanity.api";
import { sanityConfigured } from "@/lib/sanity.client";
import type { Post } from "@/lib/sanity.types";

export const revalidate = 60;

export default async function NewsIndexPage() {
  const posts = await getLatestPosts();

  return (
    <div className="page">
      <SiteHeader />
      <main className="shell" style={{ padding: "56px 0" }}>
        <div className="page-hero">
          <span className="story-tag">Newsroom</span>
          <h1 className="article-title">Latest reporting & archives.</h1>
          <p className="feature-excerpt">
            Browse every published story, from live updates to longform features.
            Each entry is curated in Sanity and delivered to readers instantly.
          </p>
          <Link href="/contact" className="btn btn-outline">
            Pitch a story
          </Link>
        </div>

        {!sanityConfigured ? (
          <div className="empty-state">
            Connect Sanity to load live stories. Add your project ID and dataset
            in <strong>.env.local</strong> and refresh.
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            No stories yet. Publish your first post in Sanity and it will appear
            here.
          </div>
        ) : (
          <div className="story-grid" style={{ marginTop: "32px" }}>
            {posts.map((post: Post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        <div style={{ marginTop: "32px" }}>
          <Link href="/" className="btn btn-outline">
            Back to home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
