import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PortableText } from "@/components/PortableText";
import { getPostBySlug } from "@/lib/sanity.api";
import { urlFor } from "@/lib/sanity.image";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Story not found | Signal Dispatch",
    };
  }
  return {
    title: `${post.title} | Signal Dispatch`,
    description: post.excerpt,
  };
}

export default async function NewsArticle({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const heroImage = urlFor(post.mainImage)
    ?.width(1600)
    .height(900)
    .fit("crop")
    .url();

  return (
    <div className="page">
      <SiteHeader />
      <main className="shell article-shell">
        <Link href="/news" className="back-link">
          ← Back to newsroom
        </Link>
        <article className="article">
          <div className="article-head">
            <div className="badges">
              {post.categories?.map((category) => (
                <span key={category} className="badge">
                  {category}
                </span>
              ))}
            </div>
            <h1 className="article-title">{post.title}</h1>
            {post.excerpt ? (
              <p className="article-excerpt">{post.excerpt}</p>
            ) : null}
            <div className="article-meta">
              <span>{post.author?.name ?? "Signal Desk"}</span>
              <span>{post.author?.role ?? "Staff Writer"}</span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
          </div>

          {heroImage ? (
            <div className="article-image">
              <Image
                src={heroImage}
                alt={post.mainImage?.alt ?? ""}
                width={1600}
                height={900}
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </div>
          ) : null}

          <div className="prose">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p>{post.excerpt ?? "No story content yet."}</p>
            )}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
