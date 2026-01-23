import { groq } from "groq";

export const latestPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->title,
    "author": author->{name, role, image},
    body
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    "categories": categories[]->title,
    "author": author->{name, role, image},
    body
  }
`;
