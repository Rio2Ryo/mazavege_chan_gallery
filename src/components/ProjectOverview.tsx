'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function ProjectOverview() {
  const { t } = useLanguage()
  return (
    <section id="project-overview" className="pb-32 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
         
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            {t({ JP: '２つのオンリーワン', EN: 'Two Only Ones' })}
          </h2>
          <div className="text-xs md:text-base text-gray-300 max-w-5xl mx-auto">
            {/* Desktop View */}
            <p className="hidden md:block leading-[2] whitespace-pre-line">
              {t({
                JP: `MOTHER VEGETABLE PROJECTは\n2つのオンリーワン事業を中心として地球とすべての生命の回復を目指す世界唯一のプロジェクトです。\n\nこのプロセスにおいて、各施設は24時間365日CO2を吸収し酸素を生成することで大気を浄化し、\n同時に生成されるマザーベジタブル製品および魚貝類の養殖業により、人間と生物の健康向上に貢献します。\n\nまたその施設を世界各地に展開することで、さらに8つの産業分野に発展します。`,
                EN: `The MOTHER VEGETABLE PROJECT is\nthe world's only project that aims to restore the Earth and all life,\ncentered around two one-of-a-kind businesses.\n\nIn this process, each facility purifies the atmosphere by absorbing CO₂\nand generating oxygen 24 hours a day, 365 days a year,\nwhile simultaneously contributing to improving the health of humans\nand living organisms through Mother Vegetable products and the aquaculture of fish and shellfish.\n\nFurthermore, by expanding these facilities around the world,\nit will develop into eight additional industrial sectors.`
              })}
            </p>

            {/* Mobile View */}
            <p className="block md:hidden leading-[2] whitespace-pre-line">
              {t({
               JP: `MOTHER VEGETABLE PROJECTは\n2つのオンリーワン事業を中心として\n地球とすべての生命の回復を目指す\n世界唯一のプロジェクトです。\n\nこのプロセスにおいて、\n各施設は24時間365日CO2を吸収し\n酸素を生成することで大気を浄化し、\n同時に生成されるマザーベジタブル製品\nおよび魚貝類の養殖業により、\n人間と生物の健康向上に貢献します。\n\nまたその施設を世界各地に展開することで、\nさらに8つの産業分野に発展します。`,
                EN: `The MOTHER VEGETABLE PROJECT is\nthe world's only project that aims to restore\nthe Earth and all life,\ncentered around two one-of-a-kind businesses.\n\nIn this process,\neach facility purifies the atmosphere\nby absorbing CO₂ and generating oxygen\n24 hours a day, 365 days a year,\nwhile simultaneously contributing to\nimproving the health of humans\nand living organisms through\nMother Vegetable products\nand the aquaculture of fish and shellfish.\n\nFurthermore, by expanding\nthese facilities around the world,\nit will develop into\neight additional industrial sectors.`
              })}
            </p>
          </div>
        </div>

        {/* Main Content - Single Block */}
        <div className="bg-gray-900/50 backdrop-blur-md border border-green-500/20 rounded-xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Section - 01 */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0  opacity-50"></div>
                  <div className="relative px-6 py-3">
                    <span className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Ⅰ</span>
                  </div>
                </div>
              </div>
              
              {/* 地球最初の生命体とは */}
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg flex-grow">
                <div className="flex justify-center my-6">
                  <div>
                    <h3 className="text-green-400 text-xl md:text-2xl font-semibold text-center mb-10">
                      {t({ JP: 'Mother Vegetable', EN: 'Mother Vegetable' })}
                    </h3>
                    <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg">
                      <img
                        src="/mazavege.png"
                        alt="マザーベジタブル"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 leading-[1.9] whitespace-pre-line mb-4 text-sm md:text-base">
                  {t({
                    JP: `地球最初の植物であるマザーベジタブルが人類に至った進化を研究し以下の3種類のマザーベジタブルを提供します。`,
                    EN: `By researching the evolutionary journey of Mother Vegetable, Earth's first vegetable, which culminated in humanity,
we offer the following three types of Mother Vegetable products:`
                  })}
                </p>

                <div className="space-y-2">
                  <p className="text-green-400 font-semibold text-sm md:text-base">{t({ JP: '①食品', EN: '①Food' })}</p>
                  <p className="text-white text-sm md:text-base">{t({ JP: '1つの生命体から人類に必要な48種類の栄養素を含む食品。', EN: 'Food derived from a single life form that provides all 48 nutrients essential for humanity.' })}</p>

                  <p className="text-green-400 font-semibold text-sm md:text-base">{t({ JP: '②スキンケア', EN: '②Skincare' })}</p>
                  <p className="text-white text-sm md:text-base">{t({ JP: '皮膚の再生に効果のあるスキンケア。', EN: 'Skincare products designed to promote reverse aging effects for the skin.' })}</p>

                  <p className="text-green-400 font-semibold text-sm md:text-base">{t({ JP: '③魚貝類の養殖', EN: '③Aquaculture' })}</p>
                  <p className="text-white text-sm md:text-base">{t({ JP: '化学物質を一切使用しない高タンパク質の魚貝類の養殖。', EN: 'Aquaculture of high-protein fish and shellfish raised with zero chemical inputs.' })}</p>
                </div>
              </div> 
             

             
            </div>

            {/* Right Section - 02 */}
            <div className="flex flex-col">
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 opacity-50"></div>
                  <div className="relative px-6 py-3">
                    <span className="text-5xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Ⅱ</span>
                  </div>
                </div>
              </div>

               {/* 驚異的なカーボンクレジット */}
              <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg flex-grow">
                <div className="my-6">
                  <h3 className="text-green-400 text-xl md:text-2xl font-semibold text-center mb-10">
                    Small Earth Factory (SEF)
                  </h3>
                  <div className="flex flex-col md:flex-row justify-center gap-4">
                    <div className="w-full md:max-w-xs h-48 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="/mv-factory-whole.jpg"
                        alt="MOTHER VEGETABLE培養システム"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-full md:max-w-xs h-48 rounded-xl overflow-hidden shadow-lg">
                      <img
                        src="/mv-factory-greenhouse.jpg"
                        alt="MOTHER VEGETABLEファクトリー建物"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-green-400 font-semibold text-sm md:text-base">{t({ JP: '①Carbon Rebirth', EN: '①Carbon Rebirth' })}</p>
                  <p className="text-white mb-3 text-sm md:text-base">{t({ JP: 'マザーベジタブル生産によるCO2の吸収（天然スギの700倍）およびO2の排出により小さな地球を再現。', EN: 'Recreating a small Earth through CO2 absorption (700 times that of natural cedar) and O2 emission by Mother Vegetable production.' })}</p>

                  <p className="text-green-400 font-semibold text-sm md:text-base">{t({ JP: '②ZERO Carbon Energy', EN: '②ZERO Carbon Energy' })}</p>
                  <p className="text-white mb-3 text-sm md:text-base">{t({ JP: '外部電力、化石燃料などCO2を排出するエネルギーを一切使用しなく、小さな地球を再現。', EN: 'Recreating a small Earth without relying on any CO₂-emitting energy sources, including external electricity or fossil fuels.' })}</p>

                  <p className="text-green-400 font-semibold text-sm md:text-base">{t({ JP: '③カーボンクレジットの試算表', EN: '③Carbon Credit Estimation Table' })}</p>
                  <p className="text-white text-sm md:text-base">{t({ JP: 'SEF 1 unit / 26m x 16m x 10階建 は面積にすると約0.5 ヘクタール。', EN: 'SEF 1 unit / 26m x 16m x 10 layers has an area of about 0.5 hectares.' })}</p>
                
                <p className="leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {t({
                      JP: `一般的な0.5ヘクタールの天然スギのCO2吸収量は年間約4ton\nSEFはその700倍のCO2吸収量により年間約2,800tonとなる。`,
                      EN: `A typical 0.5 hectare natural cedar forest absorbs about 4 tons of CO2 per year\nSEF absorbs 700 times more CO2, resulting in about 2,800 tons per year.`
                    })}
                  </p>
                  <p className="leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {t({
                      JP: `一般的なカーボンクレジットの価格は1tonあたり約4,000円\nSEFは2,800ton x 4,000円 = 11,200,000円 / 年 の収益性を実現。`,
                      EN: `The typical carbon credit price is about 25.8 USD per ton\nSEF has profitability of 2,800 tons x 25.8 USD = 72,240 USD / year.`
                    })}
                  </p>

                  <div className="mt-4 text-center">
                    <a
                      href="/download/carbon-credit"
                      className="text-white text-xs hover:text-green-400 transition-colors underline"
                    >
                      {t({
                        JP: '金融機関向けカーボンクレジット試算表',
                        EN: 'Carbon Credit Estimation Table for Financial Institutions'
                      })}
                    </a>
                  </div>

                </div>

                
              </div>

            </div>
            
          </div>
         
        </div>


      </div>
    </section>
  )
}