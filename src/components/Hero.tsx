'use client'

import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Hero() {
  const { t, language } = useLanguage()
  const scrollToDetails = () => {
    const element = document.getElementById('project-overview')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToToken = () => {
    const element = document.getElementById('token')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const downloadWhitepaper = () => {
    const link = document.createElement('a')
    link.href = '/0912_whitepaper_ja.pdf'
    link.download = 'MOTHER_VEGETABLES_Whitepaper_JP.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-earth-regeneration-Dnk2z_VF.png"
          alt="Earth Regeneration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 transition-all duration-1500 pt-40 md:pt-48 lg:pt-56">
        {/* Title Section - Single Component */}
        <div className="mb-12">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/mazavege_logo_midori.png"
              alt="Mother Vegetable Logo"
              width={140}
              height={140}
              className="mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
              priority
            />
          </div>
          <div
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 4px rgba(34, 197, 94, 0.2))',
            }}
          >
            <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              <div>MOTHER VEGETABLE PROJECT</div>
            </h1>
          </div>
          <div className="w-40 md:w-48 h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-6 opacity-80"></div>
        </div>


        {/* Description - Not in Box */}
        <div className="max-w-4xl mx-auto mb-12 mt-16 px-4">
          <div className="space-y-3">
            <p className="text-lg md:text-xl text-[#4ade80] leading-relaxed">
              {t({
                JP: '35億年前の地球のはじまりの植物',
                EN: 'The vegetable from 3.5 billion years ago'
              })}
            </p>
            <p className="text-lg md:text-xl text-[#4ade80] leading-relaxed">
              {t({
                JP: '「マザーベジタブル」',
                EN: '"Mother Vegetable"'
              })}
            </p>
            <p className="text-lg md:text-xl text-[#4ade80] leading-relaxed">
              {t({
                JP: '地球が生み出した生命力を、あなたに。',
                EN: 'Earth’s life force, for you.'
              })}
            </p>
          </div>
        </div>

      {/* Mother Vegetable Image */}
<div className="w-[80%] sm:w-[85%] md:max-w-3xl mx-auto mb-40 mt-40 px-0 sm:px-4">
  <div className="relative overflow-visible">
    <Image
      src={language === 'EN' ? "/project-overview_en.png" : "/project-overview_en.png"}
      alt="Mother Vegetable"
      width={800}
      height={533}
      className="w-full h-auto rounded-lg shadow-2xl"
      priority
    />
  </div>
</div>


      </div>
    </section>
  )
}