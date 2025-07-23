import { NextSeo, type NextSeoProps } from "next-seo"
import type { Thing } from "schema-dts"
import React from "react";

interface SEOProps extends NextSeoProps {
  schema?: Thing
  canonical?: string
}

// Modified JsonLd component to fix hydration mismatch
function ModifiedJsonLd({ item }: { item: any }) {
  if (!item) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
      suppressHydrationWarning={true}
    />
  );
}

export function SEO({ schema, canonical, ...props }: SEOProps) {
  return (
    <>
      <NextSeo {...props} canonical={canonical || `https://physioheal.com${props.canonical || ""}`} />
      {schema && <ModifiedJsonLd item={schema} />}
    </>
  )
}