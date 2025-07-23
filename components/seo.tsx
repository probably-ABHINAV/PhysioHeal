"use client"

import { FC } from "react"
import { NextSeo, NextSeoProps } from "next-seo"

type SeoProps = Omit<NextSeoProps, "canonical"> & {
  canonical?: string
}

export const Seo: FC<SeoProps> = ({ canonical, ...props }) => {
  const canonicalUrl = canonical || `https://physioheal.com`

  return (
    <>
      <NextSeo
        {...props}
        canonical={canonicalUrl}
      />
    </>
  )
}
