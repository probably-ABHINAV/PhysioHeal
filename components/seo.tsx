"use client"

import { FC } from "react"
import { NextSeo, NextSeoProps } from "next-seo"

type SeoProps = NextSeoProps & {
  canonical?: string
}

export const Seo: FC<SeoProps> = ({ canonical, ...props }) => {
  return (
    <>
      <NextSeo
        {...props}
        canonical={canonical || `https://physioheal.com${props.canonical || ""}`}
      />
    </>
  )
}
