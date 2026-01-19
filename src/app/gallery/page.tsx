'use client'

import { useState, useRef, useEffect } from 'react'
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

// 縦長動画カード - 洗練されたデザイン
function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for staggered animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100)
        }
      },
      { threshold: 0.1 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [index])

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
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* カード本体 - グラスモーフィズム効果 */}
      <div
        className="relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-2"
        style={{
          background: 'linear-gradient(135deg, rgba(39, 39, 42, 0.8) 0%, rgba(24, 24, 27, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* 境界線グラデーション */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-emerald-500/30 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* グローエフェクト */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-green-400/10 to-emerald-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />

        {/* 光の反射効果 */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(74, 222, 128, 0.1) 45%, rgba(74, 222, 128, 0.2) 50%, rgba(74, 222, 128, 0.1) 55%, transparent 60%)',
            transform: 'translateX(-100%)',
            animation: 'shimmer-sweep 3s ease-in-out infinite'
          }}
        />

        <div className="relative rounded-2xl overflow-hidden">
          {/* 9:16アスペクト比 */}
          <div
            className="relative aspect-[9/16] overflow-hidden"
            onClick={handlePlay}
          >
            {/* サムネイル */}
            <img
              src={video.thumbnail}
              alt={t(video.title)}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? 'opacity-0 scale-105' : 'opacity-100'
              } group-hover:scale-110`}
            />

            {/* 動画 */}
            <video
              ref={videoRef}
              src={video.videoUrl}
              muted={isMuted}
              playsInline
              onEnded={() => setIsPlaying(false)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isPlaying ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* オーバーレイグラデーション - 複数レイヤー */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70" />
            <div className={`absolute inset-0 bg-gradient-to-b from-emerald-900/20 via-transparent to-transparent transition-opacity duration-500 ${
              isPlaying ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
            }`} />

            {/* サイドビネット効果 */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)'
            }} />

            {/* 再生ボタン - モダンデザイン */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
              isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
            }`}>
              <div className={`relative transition-all duration-500 ease-out ${
                isPlaying ? 'scale-100' : 'scale-0 group-hover:scale-100'
              }`}>
                {/* ボタン背景グロー */}
                <div className="absolute inset-0 bg-emerald-400/50 rounded-full blur-xl scale-150 animate-pulse" />

                {/* ボタン本体 */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 backdrop-blur-sm border border-emerald-300/30">
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
            </div>

            {/* ミュートボタン - 洗練されたデザイン */}
            {isPlaying && (
              <button
                onClick={toggleMute}
                className="absolute bottom-24 right-4 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-emerald-500/80 transition-all duration-300 border border-white/10 hover:border-emerald-400/50 hover:scale-110"
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

            {/* 時間表示 - ピルデザイン */}
            <div className={`absolute bottom-4 right-4 transition-all duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <span className="px-3 py-1.5 bg-black/50 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/10">
                {video.duration}
              </span>
            </div>

            {/* カテゴリバッジ */}
            <div className={`absolute top-4 left-4 transition-all duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
              <span className="px-3 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/30 uppercase tracking-wider">
                {video.category}
              </span>
            </div>

            {/* 再生中インジケーター */}
            {isPlaying && (
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-lg shadow-red-500/30">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  LIVE
                </span>
              </div>
            )}
          </div>

          {/* コンテンツエリア */}
          <div className="p-5 relative">
            {/* 装飾ライン */}
            <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

            <h3 className="font-display text-white font-semibold text-lg leading-tight group-hover:text-emerald-400 transition-colors duration-300 line-clamp-1">
              {t(video.title)}
            </h3>
            <p className="text-zinc-500 text-sm mt-2 line-clamp-2 group-hover:text-zinc-400 transition-colors duration-300">
              {t(video.description)}
            </p>
            <div className="flex items-center gap-2 mt-3 text-zinc-600 text-xs">
              <span className="font-medium">{video.date}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span className="text-emerald-500/70">{video.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// メインページ
export default function GalleryPage() {
  const { t, language, setLanguage } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredVideos = selectedCategory === 'all'
    ? videoData
    : videoData.filter(v => v.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 背景レイヤー */}
      <div className="fixed inset-0 pointer-events-none">
        {/* グラデーションメッシュ */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% -10%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 10%, rgba(52, 211, 153, 0.1) 0%, transparent 40%),
              radial-gradient(ellipse 50% 60% at 10% 90%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse 40% 40% at 90% 80%, rgba(52, 211, 153, 0.06) 0%, transparent 40%)
            `
          }}
        />

        {/* ノイズテクスチャ */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
          }}
        />

        {/* 微細なグリッドパターン */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(74, 222, 128, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(74, 222, 128, 0.5) 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* ヘッダー */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-zinc-800/50">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)'
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img src="/mazavege_logo_midori.png" alt="Logo" className="relative w-9 h-9" />
            </div>
            <span className="font-display text-white font-bold text-xl tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
              MAZAVEGE
            </span>
          </Link>

          <button
            onClick={() => setLanguage(language === 'JP' ? 'EN' : 'JP')}
            className="relative px-4 py-2 bg-zinc-900/80 text-zinc-300 text-sm font-medium rounded-xl hover:text-white transition-all duration-300 border border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 group overflow-hidden"
          >
            <span className="relative z-10">{language === 'JP' ? 'EN' : 'JP'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="relative max-w-7xl mx-auto px-6 py-16">
        {/* ヒーローセクション */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* 装飾要素 */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-emerald-500/50" />
            <span className="text-emerald-500/80 text-xs font-semibold tracking-[0.3em] uppercase">
              {t({ JP: '公式コンテンツ', EN: 'Official Content' })}
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-emerald-500/50" />
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            <span className="inline-block">
              {t({ JP: 'アニメ', EN: 'Anime' })}
            </span>
            <span className="inline-block bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent ml-2">
              {t({ JP: 'ギャラリー', EN: 'Gallery' })}
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t({ JP: 'マザベジの世界観を体験する公式アニメーションコレクション', EN: 'Official animation collection to experience the world of Mazavege' })}
          </p>
        </div>

        {/* カテゴリフィルター */}
        <div className={`flex justify-center gap-3 mb-12 flex-wrap transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                selectedCategory === cat.id
                  ? 'text-black'
                  : 'text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50'
              }`}
              style={{
                transitionDelay: `${i * 50}ms`
              }}
            >
              {selectedCategory === cat.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500" />
              )}
              <span className="relative z-10">{t(cat.label)}</span>
            </button>
          ))}
        </div>

        {/* 動画グリッド - 非対称レイアウト */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
              <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-zinc-500 text-lg">
              {t({ JP: '動画が見つかりません', EN: 'No videos found' })}
            </p>
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="relative border-t border-zinc-900 py-12 mt-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            © 2025 Mother Vegetable Project
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-600 hover:text-emerald-400 text-sm transition-colors duration-300">
              {t({ JP: 'プライバシー', EN: 'Privacy' })}
            </a>
            <a href="#" className="text-zinc-600 hover:text-emerald-400 text-sm transition-colors duration-300">
              {t({ JP: '利用規約', EN: 'Terms' })}
            </a>
          </div>
        </div>
      </footer>

      {/* カスタムスタイル */}
      <style jsx>{`
        @keyframes shimmer-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
