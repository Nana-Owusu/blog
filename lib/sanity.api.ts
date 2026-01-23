import { sanityFetch } from "@/lib/sanity.client";
import { latestPostsQuery, postBySlugQuery } from "@/lib/sanity.queries";
import type { Post } from "@/lib/sanity.types";

export function getLatestPosts() {
  return sanityFetch<Post[]>(latestPostsQuery, {}, []);
}

export function getPostBySlug(slug: string) {
  return sanityFetch<Post | null>(postBySlugQuery, { slug }, null);
}
