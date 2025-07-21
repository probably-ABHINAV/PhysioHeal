
'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Globe } from 'lucide-react'

export function LanguageToggle() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en')

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en'
    setLanguage(newLang)
    
    // Store in localStorage
    localStorage.setItem('preferred-language', newLang)
    
    // Trigger language change event
    window.dispatchEvent(new CustomEvent('language-change', { detail: newLang }))
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
      aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">
        {language === 'en' ? 'हिंदी' : 'English'}
      </span>
    </Button>
  )
}
