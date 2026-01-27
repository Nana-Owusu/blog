import { defineLive } from "next-sanity/live";
import { sanityClient, sanityConfigured } from "@/lib/sanity.client";

const token = process.env.SANITY_VIEWER_TOKEN;

const live = sanityConfigured && sanityClient
  ? defineLive({
      client: sanityClient,
      serverToken: token,
      browserToken: token,
    })
  : null;

export const SanityLive = live?.SanityLive ?? (() => null);

export const sanityFetch =
  live?.sanityFetch ??
  (async () => ({
    data: null,
  }));
