'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function TokenInfo() {
  const { t } = useLanguage()
  const downloadWhitepaper = () => {
    const link = document.createElement('a')
    link.href = '/0912_whitepaper_ja.pdf'
    link.download = 'MOTHER_VEGETABLES_Whitepaper_JP.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="token" className="py-32 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-500/20 border border-orange-500/50 text-orange-400 px-4 py-2 rounded-full text-sm mb-12">
            {t({ JP: '4. トークン情報', EN: '4. Token Information' })}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            {t({ JP: 'MOTHER VEGETABLE Token (MVT)情報', EN: 'MOTHER VEGETABLE Token (MVT) Information' })}
          </h2>
          <p className="text-sm md:text-base text-gray-300 max-w-4xl mx-auto leading-[2] whitespace-pre-line">
            {t({
              JP: `MOTHER VEGETABLE Token（MVT）は
マザーベジタブルファクトリーと直接接続された
ユーティリティトークンとして機能し、
核心的ユーティリティを提供します。\n上場日：2025年11月11日 11:00（協定世界時）`,
              EN: `MOTHER VEGETABLE Token (MVT) functions as a utility token
directly connected to Mother Vegetable factories, providing core utilities.\nListing date : 11:00 on November 11, 2025 (UTC)`
            })}
          </p>
          <div className="mt-8">
            <img
              src="/mvt-coin.png"
              alt="MVT Token Logo"
              className="w-48 h-48 mx-auto"
            />
          </div>
        </div>

        {/* Token Details */}
        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">{t({ JP: 'トークン名称', EN: 'Token Name' })}</p>
              <p className="text-white font-bold text-lg">MOTHER VEGETABLE Token</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">{t({ JP: 'ティッカーシンボル', EN: 'Ticker Symbol' })}</p>
              <p className="text-white font-bold text-lg">$MVT</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">{t({ JP: 'ブロックチェーン', EN: 'Blockchain' })}</p>
              <p className="text-white font-bold text-lg">Ethereum</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">{t({ JP: 'トークン規格', EN: 'Token Standard' })}</p>
              <p className="text-white font-bold text-lg">ERC-20</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">{t({ JP: '総発行量', EN: 'Total Supply' })}</p>
              <p className="text-white font-bold text-lg">10,000,000,000 (10 billion)</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">{t({ JP: 'コントラクトアドレス', EN: 'Contract Address' })}</p>
              <p className="text-white font-bold text-lg break-all">0x33a4bCb4e941dD13439A8F4F723580927c6D9800</p>
            </div>
          </div>
        </div>


        {/* Pre-registration Section */}
        <div className="text-center" id="registration">
          <div className="bg-gradient-to-b from-green-500/10 to-green-700/10 border border-green-500/20 rounded-2xl p-12 max-w-3xl mx-auto mt-14">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              {t({ JP: '登録受付中', EN: 'Registration Open' })}
            </h3>
            <p className="text-gray-300 text-center mb-8 text-lg">
              {t({ JP: 'プレセールなどの最新情報を受け取る', EN: 'Receive the latest information including presale updates' })}
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => window.location.href = 'https://www.mothervegetable.net/'}
                className="bg-gradient-to-r from-green-400 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                {t({ JP: '登録する', EN: 'Register' })}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

