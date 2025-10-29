'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { newsData } from '@/data/newsData'

export default function News() {
  const { language } = useLanguage()

  return (
    <div className="w-full bg-black py-6">
      <div className="w-[95%] lg:max-w-[800px] mx-auto px-4">
        <div className="border-2 border-green-500 rounded-lg bg-green-500/5 p-8 lg:p-12">
          <div className="flex flex-col gap-3">
            {newsData.map((news) => (
              <div key={news.id} className="flex items-center gap-3">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-5 rounded-full whitespace-nowrap">
                  NEWS
                </span>
                <p className="text-white text-sm md:text-base">
                  {news.text[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
