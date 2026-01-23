import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

export const sanityConfigured = Boolean(projectId && dataset);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId: projectId ?? "",
      dataset: dataset ?? "",
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      token,
    })
  : null;

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!sanityClient) {
    return fallback;
  }
  return sanityClient.fetch<T>(query, params);
}
