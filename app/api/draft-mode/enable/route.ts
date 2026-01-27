import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { sanityClient } from "@/lib/sanity.client";

const token = process.env.SANITY_VIEWER_TOKEN;

if (!sanityClient) {
  throw new Error("Missing Sanity configuration.");
}

if (!token) {
  throw new Error("Missing SANITY_VIEWER_TOKEN.");
}

export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({
    token,
    useCdn: false,
  }),
});
