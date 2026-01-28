export type SanityImage = {
  _type: "image";
  asset?: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type Category = {
  _id: string;
  title: string;
};

export type Author = {
  name: string;
  role?: string;
  image?: SanityImage;
};

import type { TypedObject } from "@portabletext/types";

export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: SanityImage;
  categories?: string[];
  author?: Author;
  body?: TypedObject[];
};
