import imageUrlBuilder from "@sanity/image-url";
import type { SanityImage } from "@/lib/sanity.types";
import { sanityClient } from "@/lib/sanity.client";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlFor(source?: SanityImage) {
  if (!builder || !source) return undefined;
  return builder.image(source);
}
