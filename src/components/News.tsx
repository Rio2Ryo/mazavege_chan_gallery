'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { newsData } from '@/data/newsData'

export default function News() {
  const { language, t } = useLanguage()

  return (
    <div className="w-full bg-black pt-6 pb-14 lg:pb-20">
      <span className="inline-block bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-full text-sm mb-12">
            {t({ JP: '5. ニュース', EN: '5. News' })}
          </span>
      <div className="w-[95%] lg:max-w-[1200px] mx-auto px-4">
        <div className="border-2 border-green-500 rounded-lg bg-green-500/5 p-8 lg:p-12">
          <div className="flex flex-col gap-7">
            {newsData.map((news) => (
              <div key={news.id} className="flex items-center gap-3">
                <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
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
