import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/sanity.types";
import { formatDate } from "@/lib/utils";
import { urlFor } from "@/lib/sanity.image";

export function PostCard({ post }: { post: Post }) {
  const imageUrl = urlFor(post.mainImage)
    ?.width(800)
    .height(520)
    .fit("crop")
    .url();

  return (
    <Link href={`/news/${post.slug.current}`} className="story-card">
      <div className="story-card-image">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title}
            width={800}
            height={520}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : null}
      </div>
      <div className="story-card-body">
        {post.categories?.[0] ? (
          <span className="story-tag">{post.categories[0]}</span>
        ) : null}
        <div>
          <h3 className="story-title">{post.title}</h3>
          {post.excerpt ? (
            <p className="story-excerpt">{post.excerpt}</p>
          ) : null}
        </div>
        <div className="story-meta">
          <span>{post.author?.name ?? "Signal Desk"}</span>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
