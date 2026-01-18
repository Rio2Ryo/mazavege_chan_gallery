'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [activeSection, setActiveSection] = useState('')
  const { language, setLanguage, t } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const downloadWhitepaper = () => {
    const link = document.createElement('a')
    if (language === 'JP') {
      link.href = '/wh_en.pdf'
      link.download = 'MOTHER_VEGETABLES_Whitepaper_EN.pdf'
    } else {
      link.href = '/wh_en.pdf'
      link.download = 'MOTHER_VEGETABLES_Whitepaper_EN.pdf'
    }
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-green-500/20" style={{ zIndex: 1100 }}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo-uCgt3dQ.png"
              alt="MOTHER VEGETABLE"
              width={100}
              height={100}
            />
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => window.location.href = 'https://mothervegetable.com/'}
              className="px-3 md:px-4 py-2 text-sm text-[#4ade80] hover:text-green-600 transition-all duration-300"
            >
              Products
            </button>
            <button
              onClick={() => window.location.href = 'https://www.mothervegetable.org/athlete'}
              className="px-3 md:px-4 py-2 text-sm text-[#4ade80] hover:text-green-600 transition-all duration-300"
            >
              Athlete
            </button>
            <button
              onClick={() => window.location.href = '/gallery'}
              className="px-3 md:px-4 py-2 text-sm text-[#4ade80] hover:text-green-600 transition-all duration-300"
            >
              Gallery
            </button>
            <button
              onClick={() => setLanguage(language === 'EN' ? 'JP' : 'EN')}
              className="px-3 md:px-4 py-2 text-sm text-[#4ade80] hover:text-green-600 transition-all duration-300 border border-gray-600 rounded-md"
            >
              {language === 'EN' ? 'EN' : 'JP'}
            </button>
            {/*<button
              onClick={() => window.location.href = 'mailto:info@mothervegetables.com'}
              className="px-3 md:px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300"
            >
              事前登録
            </button>*/}
          </nav>
        </div>
      </div>
    </header>
  )
}

