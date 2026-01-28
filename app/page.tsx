import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PostCard } from "@/components/PostCard";
import { getLatestPosts } from "@/lib/sanity.api";
import { sanityConfigured } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/sanity.types";

export const revalidate = 60;

type FallbackItem = {
  title: string;
  category: string;
  excerpt: string;
};

type TrendingItem = Post | FallbackItem;

const fallbackTrending: FallbackItem[] = [
  {
    title: "Markets brace for a new week of inflation signals",
    category: "Markets",
    excerpt: "Analysts focus on policy language and labor revisions.",
  },
  {
    title: "Inside the founders reshaping climate-first logistics",
    category: "Startups",
    excerpt: "New models for last-mile delivery move into scale.",
  },
  {
    title: "A city council vote turns into a tech investment rally",
    category: "Policy",
    excerpt: "How public-private deals rewrite local innovation.",
  },
  {
    title: "The new retail playbook: smaller footprints, smarter data",
    category: "Business",
    excerpt: "Brands rethink their footprints in 2026.",
  },
];

const fallbackEditors: FallbackItem[] = [
  {
    title: "Where the next capital cycle is forming",
    category: "Capital",
    excerpt: "Investors map the signals for long-term returns.",
  },
  {
    title: "The founders building hardware for resilient cities",
    category: "Innovation",
    excerpt: "Infrastructure startups move from pilot to production.",
  },
  {
    title: "Culture desks: the new economy of creative work",
    category: "Culture",
    excerpt: "What creators want from brands in 2026.",
  },
];

export default async function Home() {
  const posts = await getLatestPosts();

  const featured = posts[0];
  const trending = posts.slice(1, 5);
  const editorsPicks = posts.slice(5, 8);
  const latest = posts.slice(0, 3);
  const headlines = posts.slice(3, 7);
  const around = posts.slice(7, 10);
  const podcasts = posts.slice(10, 13);

  const featureImage = urlFor(featured?.mainImage)
    ?.width(1400)
    .height(900)
    .fit("crop")
    .url();

  const renderStoryRow = (post: Post) => {
    const rowImage = urlFor(post.mainImage)
      ?.width(400)
      .height(260)
      .fit("crop")
      .url();
    return (
      <Link href={`/news/${post.slug.current}`} className="story-row">
        <div className="story-row-image">
          {rowImage ? (
            <Image
              src={rowImage}
              alt={post.mainImage?.alt ?? post.title}
              width={400}
              height={260}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : null}
        </div>
        <div>
          {post.categories?.[0] ? (
            <span className="story-tag">{post.categories[0]}</span>
          ) : null}
          <h4 className="story-row-title">{post.title}</h4>
          <div className="story-meta">
            <span>{post.author?.name ?? "Signal Desk"}</span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="page">
      <SiteHeader />
      <main className="shell">
        <section className="hero-layout">
          <article className="feature-story">
            <div className="feature-image">
              {featureImage ? (
                <Image
                  src={featureImage}
                  alt={featured?.mainImage?.alt ?? featured?.title ?? ""}
                  width={1400}
                  height={900}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  priority
                />
              ) : null}
            </div>
            <div className="feature-body">
              <span className="story-tag">Featured</span>
              <h1 className="feature-title">
                {featured?.title ??
                  "Inside the week: the business moves shaping 2026."}
              </h1>
              <p className="feature-excerpt">
                {featured?.excerpt ??
                  "A sharper look at leadership, policy, and the companies rewriting the playbook."}
              </p>
              <div className="story-meta">
                <span>{featured?.author?.name ?? "Signal Desk"}</span>
                <span>{formatDate(featured?.publishedAt) || "This week"}</span>
              </div>
              <Link
                href={featured ? `/news/${featured.slug.current}` : "/news"}
                className="btn btn-primary"
              >
                Read the cover story
              </Link>
            </div>
          </article>

          <aside className="trending">
            <h3>Trending now</h3>
            <div className="trending-list">
              {(trending.length > 0 ? trending : fallbackTrending).map(
                (item: TrendingItem, index: number) => {
                  if ("slug" in item) {
                    return (
                      <Link
                        key={item._id}
                        href={`/news/${item.slug.current}`}
                        className="trending-item"
                      >
                        <span>{item.categories?.[0] ?? "News"}</span>
                        <strong>{item.title}</strong>
                        <p className="story-excerpt">{item.excerpt}</p>
                      </Link>
                    );
                  }
                  return (
                    <Link
                      key={`${item.title}-${index}`}
                      href="/news"
                      className="trending-item"
                    >
                      <span>{item.category}</span>
                      <strong>{item.title}</strong>
                      <p className="story-excerpt">{item.excerpt}</p>
                    </Link>
                  );
                }
              )}
            </div>
          </aside>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>Editor’s picks</h2>
              <span>Curated stories from the Signal desk.</span>
            </div>
            <Link href="/news" className="btn btn-outline">
              View all news
            </Link>
          </div>
          <div className="story-grid">
            {(editorsPicks.length > 0 ? editorsPicks : [])
              .slice(0, 3)
              .map((post: Post) => (
                <PostCard key={post._id} post={post} />
              ))}
            {editorsPicks.length === 0
              ? fallbackEditors.map((item) => (
                  <div key={item.title} className="story-card">
                    <div className="story-card-image" />
                    <div className="story-card-body">
                      <span className="story-tag">{item.category}</span>
                      <div>
                        <h3 className="story-title">{item.title}</h3>
                        <p className="story-excerpt">{item.excerpt}</p>
                      </div>
                      <div className="story-meta">
                        <span>Signal Desk</span>
                        <span>Editorial</span>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>Latest updates</h2>
              <span>Fresh reporting, straight from Sanity.</span>
            </div>
          </div>
          {!sanityConfigured ? (
            <div className="empty-state">
              Connect Sanity to load live stories. Add your project ID and
              dataset in <strong>.env.local</strong> and refresh.
            </div>
          ) : latest.length === 0 ? (
            <div className="empty-state">
              No stories yet. Publish your first post in Sanity and it will
              appear here.
            </div>
          ) : (
            <div className="story-grid">
              {latest.map((post: Post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>Headlines</h2>
              <span>Quick reads and developing coverage.</span>
            </div>
          </div>
          <div>
            {headlines.length > 0
              ? headlines.map((post: Post) => renderStoryRow(post))
              : fallbackTrending.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="story-row">
                    <div className="story-row-image" />
                    <div>
                      <span className="story-tag">{item.category}</span>
                      <h4 className="story-row-title">{item.title}</h4>
                      <p className="story-excerpt">{item.excerpt}</p>
                    </div>
                  </div>
                ))}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>Browse by category</h2>
              <span>Keep your newsroom organized by beat.</span>
            </div>
          </div>
          <div className="category-strip">
            {[
              "Business",
              "Markets",
              "Startups",
              "Policy",
              "Tech",
              "Culture",
              "Energy",
              "Opinion",
            ].map((category) => (
              <span key={category} className="category-pill">
                {category}
              </span>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="magazine-cta">
            <div>
              <h3>Download the weekly business briefing.</h3>
              <p className="feature-excerpt">
                A curated digest of executive moves, market shifts, and the most
                important reads from the newsroom.
              </p>
              <div className="hero-actions">
                <Link href="/contact" className="btn btn-primary">
                  Get the briefing
                </Link>
                <Link href="/news" className="btn btn-outline">
                  Explore archives
                </Link>
              </div>
            </div>
            <div className="magazine-card">
              <span>Signal Dispatch</span>
              <strong>Weekly Briefing</strong>
              <p>January 2026 Edition</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>Around the world</h2>
              <span>Global reporting from our partners.</span>
            </div>
          </div>
          <div className="story-grid">
            {(around.length > 0 ? around : [])
              .slice(0, 3)
              .map((post: Post) => (
                <PostCard key={post._id} post={post} />
              ))}
            {around.length === 0
              ? fallbackTrending.slice(0, 3).map((item) => (
                  <div key={item.title} className="story-card">
                    <div className="story-card-image" />
                    <div className="story-card-body">
                      <span className="story-tag">{item.category}</span>
                      <div>
                        <h3 className="story-title">{item.title}</h3>
                        <p className="story-excerpt">{item.excerpt}</p>
                      </div>
                      <div className="story-meta">
                        <span>Global Desk</span>
                        <span>Update</span>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <h2>Podcasts & conversations</h2>
              <span>Hear from founders, analysts, and editors.</span>
            </div>
            <Link href="/contact" className="btn btn-outline">
              Pitch a guest
            </Link>
          </div>
          <div className="story-grid">
            {(podcasts.length > 0 ? podcasts : [])
              .slice(0, 3)
              .map((post: Post) => (
                <PostCard key={post._id} post={post} />
              ))}
            {podcasts.length === 0
              ? fallbackEditors.map((item) => (
                  <div key={item.title} className="story-card">
                    <div className="story-card-image" />
                    <div className="story-card-body">
                      <span className="story-tag">{item.category}</span>
                      <div>
                        <h3 className="story-title">{item.title}</h3>
                        <p className="story-excerpt">{item.excerpt}</p>
                      </div>
                      <div className="story-meta">
                        <span>Signal Audio</span>
                        <span>New</span>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </section>

        <section className="section">
          <div className="newsletter">
            <div>
              <span className="story-tag">Stay connected</span>
              <h2 className="feature-title">Subscribe to the daily signal.</h2>
              <p className="feature-excerpt">
                Get a concise briefing every morning. Hand-picked by editors,
                delivered before the markets open.
              </p>
            </div>
            <div>
              <form className="newsletter-form">
                <input type="text" placeholder="Full name" />
                <input type="email" placeholder="Email address" />
                <button type="submit" className="btn btn-primary">
                  Join the newsletter
                </button>
              </form>
              <div className="social-strip">
                <span>Follow: @signaldispatch</span>
                <span>Listen: Signal Dispatch Daily</span>
                <span>Contact: newsroom@signaldispatch.com</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
