'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t, language } = useLanguage()

  const downloadWhitepaper = () => {
    const pdfUrl = language === 'JP' ? '/wh_ja.pdf' : '/wh_en.pdf'
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = language === 'JP' ? 'Whitepaper_JP.pdf' : 'Whitepaper_EN.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <footer className="bg-black">
      <div className="container rounded-xl px-8 pt-6 mb-1 mx-auto">
        {/* Decorative underline */}
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#25C760] to-transparent mx-auto mb-8"></div>
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/mazavege_logo_midori.png"
            alt="Mother Vegetable Logo"
            width={24}
            height={24}
            className="w-12 h-12"
          />
        </div>

        {/* Title */}
        <h2 className="text-xs md:text-sm font-bold text-[#25C760] text-center mb-3">Mother Vegetable Group</h2>

        {/* Countries Grid */}
        <div className="grid grid-cols-9 grid-rows-2 gap-x-0 gap-y-1 mx-auto text-center max-w-[910px]">
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Japan</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">South Korea</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Hong Kong</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Malaysia</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Singapore</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Indonesia</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Thailand</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Mongolia</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Australia</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Germany</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Italy</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">France</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Switzerland</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">United Kingdom</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Canada</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">USA</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Brazil</div>
          <div className="text-[#25C760] text-xs md:text-sm font-medium">Peru</div>
        </div>
      </div>
      {/* Main Footer Content 
      <div className="container mx-auto px-4 py-12">
        <div className="w-full md:w-full h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-0 opacity-80 mb-14"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="text-center md:text-left">
            <h3 className="text-green-400 font-semibold text-base md:text-lg mb-3 md:mb-4">Japan Office</h3>
            <p className="text-white text-xs md:text-sm leading-relaxed">
              {t({
                JP: '東京都中央区日本橋室町1-2-6-7F',
                EN: 'Nihonbashi Daiei Bldg 7F, 1-2-6 Nihonbashi-Muromachi, Chuo-ku, Tokyo, Japan'
              })}
            </p>
          </div>

          
          <div className="text-center md:text-left">
            <h3 className="text-green-400 font-semibold text-base md:text-lg mb-3 md:mb-4">Malaysia Office</h3>
            <p className="text-white text-xs md:text-sm leading-relaxed">
              IB Tower, Level 33, 8, Lrg Binjai, Kuala Lumpur, 50450 Kuala Lumpur, Malaysia
            </p>
          </div>

          
          <div className="text-center md:text-left">
            <h3 className="text-green-400 font-semibold text-base md:text-lg mb-3 md:mb-4">Singapore Office</h3>
            <p className="text-white text-xs md:text-sm leading-relaxed">
              Level 39, Marina Bay Financial Centre, 10 Marina Blvd, Tower 2, Singapore
            </p>
          </div>

         
          <div className="text-center md:text-left">
            <h3 className="text-green-400 font-semibold text-base md:text-lg mb-3 md:mb-4">Hong Kong Office</h3>
            <p className="text-white text-xs md:text-sm leading-relaxed">
              Tower I, Grand Century Place, 193 Prince Edward Road West, Hong Kong SAR
            </p>
          </div>
        </div>
        <div className="w-full md:w-full h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-14 opacity-80 mb-6"></div>
      </div>*/}

      {/* Legal Links & Copyright */}
      <div className="">
        <div className="container mx-auto px-4 pt-3 pb-6">
          <div className="text-center space-y-4">

            <div className="text-[#25C760] text-sm whitespace-pre-line">
              {t({
                JP: '© 2025 MOTHER VEGETABLE PROJECT.\nAll rights reserved.',
                EN: '© 2025 MOTHER VEGETABLE PROJECT.\nAll rights reserved.'
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}