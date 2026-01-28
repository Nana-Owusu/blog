import { sanityFetch } from "@/lib/sanity.live";
import { latestPostsQuery, postBySlugQuery } from "@/lib/sanity.queries";
import type { Post } from "@/lib/sanity.types";
import { sanityConfigured } from "@/lib/sanity.client";

export async function getLatestPosts() {
  if (!sanityConfigured) return [];
  const { data } = (await sanityFetch({
    query: latestPostsQuery,
  })) as { data: Post[] };
  return data ?? [];
}

export async function getPostBySlug(slug: string) {
  if (!sanityConfigured) return null;
  const { data } = (await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
  })) as { data: Post | null };
  return data ?? null;
}
