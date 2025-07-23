// components/seo.tsx

"use client"

import { FC } from "react"
import { NextSeo, NextSeoProps } from "next-seo"
import { ModifiedJsonLd } from "./jsonld"

type SeoProps = NextSeoProps & {
  schema?: Record<string, any>
  canonical?: string // ✅ ADD THIS LINE
}

export const SEO: FC<SeoProps> = ({ schema, canonical, ...props }) => {
  return (
    <>
      <NextSeo
        {...props}
        canonical={canonical || `https://physioheal.com${props.canonical || ""}`}
      />
      {schema && <ModifiedJsonLd item={schema} />}
    </>
  )
}
