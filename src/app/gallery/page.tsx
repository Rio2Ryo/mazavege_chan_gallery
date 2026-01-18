'use client'

import { useState, useRef } from 'react'
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
  featured?: boolean
}

// 動画データ
const videoData: VideoItem[] = [
  {
    id: '1',
    title: { JP: 'マザベジアニメ #1', EN: 'Mazavege Anime #1' },
    description: { JP: 'マザーベジタブルの起源と35億年の歴史', EN: 'Origin and 3.5 billion year history of Mother Vegetable' },
    thumbnail: '/mazavege.png',
    videoUrl: '/mazavege_anime%231_fin.mp4',
    category: 'story',
    duration: '2:30',
    date: '2025-01',
    featured: true
  },
  {
    id: '2',
    title: { JP: 'ビジネスアニメ #2', EN: 'Business Anime #2' },
    description: { JP: 'ビジネスモデルを解説', EN: 'Explaining the business model' },
    thumbnail: '/mv-factory-whole.jpg',
    videoUrl: '/BizAnime_2.mp4',
    category: 'business',
    duration: '3:00',
    date: '2025-01'
  },
  {
    id: '3',
    title: { JP: 'スポーツアニメ #2', EN: 'Sports Anime #2' },
    description: { JP: 'アスリートとの関係', EN: 'Relationship with athletes' },
    thumbnail: '/mazavege_logo_midori.png',
    videoUrl: '/sports_2.mp4',
    category: 'sports',
    duration: '2:45',
    date: '2025-01'
  }
]

// カテゴリ
const categories = [
  { id: 'all', label: { JP: 'すべて', EN: 'All' } },
  { id: 'story', label: { JP: 'ストーリー', EN: 'Story' } },
  { id: 'business', label: { JP: 'ビジネス', EN: 'Business' } },
  { id: 'sports', label: { JP: 'スポーツ', EN: 'Sports' } }
]

// 縦長動画カード
function VideoCard({ video }: { video: VideoItem }) {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-xl bg-zinc-900 cursor-pointer">
      {/* グローエフェクト */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-500 group-hover:duration-200" />
      
      <div className="relative bg-zinc-900 rounded-xl overflow-hidden">
        {/* 9:16アスペクト比 */}
        <div 
          className="relative aspect-[9/16] overflow-hidden"
          onClick={handlePlay}
        >
          {/* サムネイル */}
          <img 
            src={video.thumbnail} 
            alt={t(video.title)}
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'opacity-0' : 'opacity-100'} group-hover:scale-110`}
          />
          
          {/* 動画 */}
          <video
            ref={videoRef}
            src={video.videoUrl}
            muted={isMuted}
            playsInline
            onEnded={() => setIsPlaying(false)}
            className={`absolute inset-0 w-full h-full object-cover ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* オーバーレイ */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'}`} />
          
          {/* 再生ボタン */}
          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
            <div className={`w-16 h-16 bg-emerald-400/90 rounded-full flex items-center justify-center transform transition-all duration-300 backdrop-blur-sm ${isPlaying ? 'scale-100' : 'scale-0 group-hover:scale-100'}`}>
              {isPlaying ? (
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
              )}
            </div>
          </div>
          
          {/* ミュートボタン */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute bottom-20 right-3 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-emerald-400 hover:text-black transition-colors"
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          )}
          
          {/* 時間 */}
          <span className={`absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded backdrop-blur-sm transition-opacity ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            {video.duration}
          </span>
          
          {/* 再生中バッジ */}
          {isPlaying && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIVE
            </span>
          )}
        </div>
        
        {/* タイトル */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg line-clamp-1 group-hover:text-emerald-400 transition-colors duration-300">
            {t(video.title)}
          </h3>
          <p className="text-zinc-400 text-sm mt-1">
            {video.date}
          </p>
        </div>
      </div>
    </div>
  )
}

// メインページ
export default function GalleryPage() {
  const { t, language, setLanguage } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredVideos = selectedCategory === 'all'
    ? videoData
    : videoData.filter(v => v.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/mazavege_logo_midori.png" alt="Logo" className="w-8 h-8" />
            <span className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">
              MAZAVEGE
            </span>
          </Link>
          
          <button
            onClick={() => setLanguage(language === 'JP' ? 'EN' : 'JP')}
            className="px-3 py-1.5 bg-zinc-800 text-white text-sm font-medium rounded-lg hover:bg-emerald-400 hover:text-black transition-colors"
          >
            {language === 'JP' ? 'EN' : 'JP'}
          </button>
        </div>
      </header>

      {/* メイン */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* タイトル */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t({ JP: 'アニメギャラリー', EN: 'Anime Gallery' })}
          </h1>
          <p className="text-zinc-400 text-lg">
            {t({ JP: 'マザベジの世界を体験', EN: 'Experience the world of Mazavege' })}
          </p>
        </div>

        {/* カテゴリフィルター */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-400 text-black'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>

        {/* 動画グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <p className="text-center text-zinc-500 py-12">
            {t({ JP: '動画が見つかりません', EN: 'No videos found' })}
          </p>
        )}
      </main>

      {/* フッター */}
      <footer className="border-t border-zinc-800 py-6 mt-12">
        <p className="text-center text-zinc-500 text-sm">
          © 2025 Mother Vegetable Project
        </p>
      </footer>
    </div>
  )
}
