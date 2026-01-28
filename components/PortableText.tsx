import Image from "next/image";
import { PortableText as PortableTextRenderer } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";
import { urlFor } from "@/lib/sanity.image";
import type { SanityImage } from "@/lib/sanity.types";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageValue = value as SanityImage | undefined;
      const imageUrl = urlFor(imageValue)
        ?.width(1200)
        .height(700)
        .fit("crop")
        .url();
      if (!imageUrl) return null;
      return (
        <div className="article-image" style={{ margin: "24px 0" }}>
          <Image
            src={imageUrl}
            alt={imageValue?.alt ?? ""}
            width={1200}
            height={700}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const rel = href.startsWith("http") ? "noreferrer" : undefined;
      return (
        <a href={href} rel={rel} style={{ color: "var(--accent)" }}>
          {children}
        </a>
      );
    },
  },
};

export function PortableText({ value }: { value: TypedObject[] }) {
  return <PortableTextRenderer value={value} components={components} />;
}
