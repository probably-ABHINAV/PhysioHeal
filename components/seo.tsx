import { NextSeo, type NextSeoProps } from "next-seo"
import { JsonLd } from "react-schemaorg"
import type { Thing } from "schema-dts"

interface SEOProps extends NextSeoProps {
  schema?: Thing
  canonical?: string
}

export function SEO({ schema, canonical, ...props }: SEOProps) {
  return (
    <>
      <NextSeo {...props} canonical={canonical || `https://physioheal.com${props.canonical || ""}`} />
      {schema && <JsonLd item={schema} />}
    </>
  )
}
