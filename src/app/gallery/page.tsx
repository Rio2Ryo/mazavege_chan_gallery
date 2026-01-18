'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

// 動画データの型定義
interface VideoItem {
  id: string
  title: { JP: string; EN: string }
  description: { JP: string; EN: string }
  thumbnail: string
  videoUrl: string
  category: 'business' | 'sports' | 'story' | 'other'
  duration: string
  date: string
}

// サンプル動画データ（実際の動画に合わせて更新してください）
const videoData: VideoItem[] = [
  {
    id: '1',
    title: {
      JP: 'マザベジアニメ #1',
      EN: 'Mazavege Anime #1'
    },
    description: {
      JP: 'マザーベジタブルの起源と35億年の歴史を描いたアニメーション',
      EN: 'Animation depicting the origin and 3.5 billion year history of Mother Vegetable'
    },
    thumbnail: '/mazavege.png',
    videoUrl: '/mazavege_anime%231_fin.mp4',
    category: 'story',
    duration: '2:30',
    date: '2025-01'
  },
  {
    id: '2',
    title: {
      JP: 'ビジネスアニメ #2',
      EN: 'Business Anime #2'
    },
    description: {
      JP: 'MOTHER VEGETABLE PROJECTのビジネスモデルを解説',
      EN: 'Explaining the MOTHER VEGETABLE PROJECT business model'
    },
    thumbnail: '/mv-factory-whole.jpg',
    videoUrl: '/BizAnime_2.mp4',
    category: 'business',
    duration: '3:00',
    date: '2025-01'
  },
  {
    id: '3',
    title: {
      JP: 'スポーツアニメ #2',
      EN: 'Sports Anime #2'
    },
    description: {
      JP: 'アスリートとマザーベジタブルの関係を紹介',
      EN: 'Introducing the relationship between athletes and Mother Vegetable'
    },
    thumbnail: '/mazavege_logo_midori.png',
    videoUrl: '/sports_2.mp4',
    category: 'sports',
    duration: '2:45',
    date: '2025-01'
  }
]

// カテゴリフィルター
const categories = [
  { id: 'all', label: { JP: 'すべて', EN: 'All' } },
  { id: 'story', label: { JP: 'ストーリー', EN: 'Story' } },
  { id: 'business', label: { JP: 'ビジネス', EN: 'Business' } },
  { id: 'sports', label: { JP: 'スポーツ', EN: 'Sports' } },
  { id: 'other', label: { JP: 'その他', EN: 'Other' } }
]

// 動画カードコンポーネント
function VideoCard({ video, onClick }: { video: VideoItem; onClick: () => void }) {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-900/50 backdrop-blur-md border border-green-500/20 rounded-xl overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
        {/* サムネイル */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnail}
            alt={t(video.title)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* 再生オーバーレイ */}
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-16 h-16 rounded-full bg-green-500/80 flex items-center justify-center backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-8 h-8 ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* 再生時間 */}
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
            {video.duration}
          </div>
        </div>

        {/* 情報 */}
        <div className="p-4">
          <h3 className="text-green-400 font-semibold text-lg mb-2 line-clamp-1">
            {t(video.title)}
          </h3>
          <p className="text-gray-300 text-sm line-clamp-2 mb-3">
            {t(video.description)}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">
              {t(categories.find(c => c.id === video.category)?.label || { JP: '', EN: '' })}
            </span>
            <span>{video.date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 動画モーダルコンポーネント
function VideoModal({ video, onClose }: { video: VideoItem | null; onClose: () => void }) {
  const { t, language } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [video])

  if (!video) return null

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      style={{ zIndex: 1400 }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-gray-900 rounded-2xl overflow-hidden border border-green-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 動画プレーヤー */}
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="w-full h-full"
            src={video.videoUrl}
            controls
            autoPlay
            muted={isMuted}
            playsInline
          />
          {/* ミュートボタン */}
          <button
            onClick={toggleMute}
            className="absolute bottom-16 right-4 inline-flex items-center justify-center rounded-full bg-black/40 px-3 py-3 text-white backdrop-blur-md transition hover:bg-black/60"
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                <line x1="16" y1="9" x2="20" y2="13" />
                <line x1="20" y1="9" x2="16" y2="13" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                <path d="M16 9a4 4 0 0 1 0 6" />
                <path d="M18.5 7.5a7 7 0 0 1 0 9" />
              </svg>
            )}
          </button>
        </div>

        {/* 動画情報 */}
        <div className="p-6">
          <h2 className="text-green-400 text-2xl font-bold mb-3">
            {t(video.title)}
          </h2>
          <p className="text-gray-300 mb-4">
            {t(video.description)}
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded">
              {t(categories.find(c => c.id === video.category)?.label || { JP: '', EN: '' })}
            </span>
            <span>{video.duration}</span>
            <span>{video.date}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const { t, language, setLanguage } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  // フィルタリングされた動画
  const filteredVideos = selectedCategory === 'all'
    ? videoData
    : videoData.filter(v => v.category === selectedCategory)

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-green-500/20" style={{ zIndex: 1100 }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* ロゴ */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-uCgt3dQ.png"
                alt="MOTHER VEGETABLE"
                width={100}
                height={100}
              />
            </Link>

            {/* ナビゲーション */}
            <nav className="flex items-center space-x-1 lg:space-x-2">
              <Link
                href="/"
                className="px-3 md:px-4 py-2 text-sm text-[#4ade80] hover:text-green-600 transition-all duration-300"
              >
                Home
              </Link>
              <button
                onClick={() => setLanguage(language === 'EN' ? 'JP' : 'EN')}
                className="px-3 md:px-4 py-2 text-sm text-[#4ade80] hover:text-green-600 transition-all duration-300 border border-gray-600 rounded-md"
              >
                {language === 'EN' ? 'EN' : 'JP'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* ページタイトル */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <Image
                src="/mazavege_logo_midori.png"
                alt="Mother Vegetable Logo"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t({ JP: 'マザベジアニメ ギャラリー', EN: 'Mazavege Anime Gallery' })}
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t({
                JP: 'マザーベジタブルの世界観を伝えるアニメーションコレクション',
                EN: 'Animation collection conveying the world of Mother Vegetable'
              })}
            </p>
            <div className="w-40 md:w-48 h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-6 opacity-80"></div>
          </div>

          {/* カテゴリフィルター */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-green-500/20'
                }`}
              >
                {t(category.label)}
              </button>
            ))}
          </div>

          {/* 動画グリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => setSelectedVideo(video)}
              />
            ))}
          </div>

          {/* 動画がない場合 */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">
                {t({
                  JP: 'このカテゴリの動画はまだありません',
                  EN: 'No videos in this category yet'
                })}
              </p>
            </div>
          )}

          {/* 追加予定のお知らせ */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gray-900/50 backdrop-blur-md border border-green-500/20 rounded-xl p-6 md:p-8">
              <h3 className="text-green-400 text-xl font-semibold mb-3">
                {t({ JP: '新しいアニメを準備中！', EN: 'New animations coming soon!' })}
              </h3>
              <p className="text-gray-300">
                {t({
                  JP: 'マザベジちゃんの冒険はまだまだ続きます。お楽しみに！',
                  EN: "Mazavege-chan's adventures continue. Stay tuned!"
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="bg-black border-t border-green-500/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#25C760] to-transparent mb-4"></div>
            <Image
              src="/mazavege_logo_midori.png"
              alt="Mother Vegetable Logo"
              width={32}
              height={32}
              className="mx-auto mb-2"
            />
            <p className="text-[#25C760] text-sm">
              © 2025 MOTHER VEGETABLE PROJECT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* 動画モーダル */}
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Mazavege-chan Fixed GIF */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center">
        <img
          src="/mazavegechan.gif"
          alt="Mazavege-chan"
          className="w-16 h-16 md:w-24 md:h-24 rounded-full"
        />
        <div className="text-white text-xs text-center mt-2">
          <p>Mazavege-chan</p>
          <p>AI Agent</p>
          <p>Coming Soon!!</p>
        </div>
      </div>
    </main>
  )
}
