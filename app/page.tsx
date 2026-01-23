import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PostCard } from "@/components/PostCard";
import { getLatestPosts } from "@/lib/sanity.api";
import { sanityConfigured } from "@/lib/sanity.client";

export const revalidate = 60;

export default async function Home() {
  const posts = await getLatestPosts();
  const heroPost = posts[0];
  const latestPosts = posts.slice(0, 6);

  return (
    <div className="page">
      <SiteHeader />
      <main className="shell">
        <section className="hero" id="top">
          <div className="hero-panel">
            <span className="eyebrow">Independent Newsroom</span>
            <h1>Every signal, every shift, every story.</h1>
            <p>
              Signal Dispatch is a bold editorial layout built for live reporting.
              Publish from Sanity, curate in minutes, and deliver clear reporting
              without design debt.
            </p>
            <div className="hero-actions">
              <Link href="#latest" className="btn btn-primary">
                Explore latest stories
              </Link>
              <Link href="#newsletter" className="btn btn-outline">
                Meet the editorial desk
              </Link>
            </div>
          </div>
          <div className="hero-aside">
            <div className="stat-card">
              <h3>Daily dispatch</h3>
              <p>
                Schedule live updates, opinion columns, and breaking alerts
                directly from Sanity.
              </p>
            </div>
            <div className="stat-card">
              <h3>Custom beats</h3>
              <p>
                Build coverage lanes for politics, culture, tech, and local
                reporting with flexible schemas.
              </p>
            </div>
            <div className="stat-card">
              <h3>Client controlled</h3>
              <p>
                Editors publish stories in Sanity while the site stays fast,
                secure, and on-brand.
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="latest">
          <div className="section-title">
            <h2>Latest briefings</h2>
            <span>Updated straight from the Sanity newsroom.</span>
          </div>

          {!sanityConfigured ? (
            <div className="empty-state">
              Connect Sanity to load live stories. Add your project ID and
              dataset in <strong>.env.local</strong> and refresh.
            </div>
          ) : latestPosts.length === 0 ? (
            <div className="empty-state">
              No stories yet. Publish your first post in Sanity and it will
              appear here.
            </div>
          ) : (
            <div className="grid">
              {latestPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>

        <section className="section" id="coverage">
          <div className="section-title">
            <h2>Coverage lanes</h2>
            <span>Designed for editorial clarity.</span>
          </div>
          <div className="grid">
            {[
              {
                title: "The Daily Pulse",
                description:
                  "A rolling feed for breaking updates, designed for speed and clarity.",
              },
              {
                title: "Deep Reads",
                description:
                  "Longform analysis with rich typography and immersive layouts.",
              },
              {
                title: "Local Lens",
                description:
                  "Community stories and features that keep audiences connected.",
              },
            ].map((lane) => (
              <div key={lane.title} className="card">
                <h3>{lane.title}</h3>
                <p>{lane.description}</p>
                <span className="badge">Editorial lane</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="newsletter">
          <div className="cta">
            <h3>Editorial desk</h3>
            <p>
              Keep your newsroom in sync with a flexible Sanity workflow. Assign
              authors, add categories, and schedule publication with ease.
            </p>
            <div className="hero-actions">
              {heroPost ? (
                <Link
                  href={`/news/${heroPost.slug.current}`}
                  className="btn btn-primary"
                >
                  Read the feature story
                </Link>
              ) : null}
              <Link href="#latest" className="btn btn-outline">
                Browse the archive
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
