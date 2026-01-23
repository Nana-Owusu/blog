import Link from "next/link";
import type { Post } from "@/lib/sanity.types";
import { formatDate } from "@/lib/utils";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/news/${post.slug.current}`} className="card">
      <div className="badges">
        {post.categories?.slice(0, 2).map((category) => (
          <span key={category} className="badge">
            {category}
          </span>
        ))}
      </div>
      <div>
        <h3>{post.title}</h3>
        {post.excerpt ? <p>{post.excerpt}</p> : null}
      </div>
      <div className="card-meta">
        <span>{post.author?.name ?? "Signal Desk"}</span>
        <span>{formatDate(post.publishedAt)}</span>
      </div>
    </Link>
  );
}
