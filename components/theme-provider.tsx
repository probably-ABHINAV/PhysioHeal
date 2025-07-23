'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {/* If you want to suppress hydration warnings, apply it to a wrapper div */}
      <div suppressHydrationWarning>
        {children}
      </div>
    </NextThemesProvider>
  )
}
