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

// サンプル動画データ
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
    date: '2025-01',
    featured: true
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
  { id: 'all', label: { JP: 'すべて', EN: 'All' }, icon: '✦' },
  { id: 'story', label: { JP: 'ストーリー', EN: 'Story' }, icon: '◈' },
  { id: 'business', label: { JP: 'ビジネス', EN: 'Business' }, icon: '◆' },
  { id: 'sports', label: { JP: 'スポーツ', EN: 'Sports' }, icon: '◇' },
  { id: 'other', label: { JP: 'その他', EN: 'Other' }, icon: '○' }
]

// 縦長動画カード（9:16対応）- 洗練されたデザイン
function VerticalVideoCard({ video, index }: { video: VideoItem; index: number }) {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
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

  const handleVideoEnd = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="group cursor-pointer opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* グローエフェクト（ホバー時） */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-green-500/30 via-emerald-400/20 to-green-500/30 rounded-3xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="relative h-full bg-gradient-to-br from-gray-900/90 via-gray-900/70 to-black/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-green-400/40 hover:shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 transform-gpu">
        
        {/* シマーエフェクト */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-green-400/5 to-transparent bg-[length:200%_100%] transition-opacity duration-300 ${isHovered ? 'opacity-100 animate-shimmer' : 'opacity-0'}`} />
        
        {/* 9:16縦長動画エリア */}
        <div 
          className="relative w-full overflow-hidden" 
          style={{ aspectRatio: '9/16' }}
          onClick={handlePlay}
        >
          {/* サムネイル */}
          <img
            src={video.thumbnail}
            alt={t(video.title)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'opacity-0 scale-105' : 'opacity-100'} ${isHovered && !isPlaying ? 'scale-110 brightness-110' : 'scale-100'}`}
          />
          
          {/* 動画プレーヤー */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            src={video.videoUrl}
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnd}
            preload="metadata"
          />

          {/* マルチレイヤーグラデーションオーバーレイ */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 ${isPlaying ? 'opacity-40' : 'opacity-80'}`} />
          <div className={`absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* 再生ボタン */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
            <div className={`relative transition-all duration-500 ${isHovered && !isPlaying ? 'scale-110' : 'scale-100'}`}>
              {/* ボタングロー */}
              <div className={`absolute inset-0 bg-green-400 rounded-full blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-30'}`} />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-green-500/30 backdrop-blur-sm">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-7 h-7">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-7 h-7 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* ミュートボタン */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute bottom-24 right-4 w-10 h-10 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-green-500/80 transition-all duration-300 z-10 border border-white/10"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                  <line x1="16" y1="9" x2="20" y2="13" />
                  <line x1="20" y1="9" x2="16" y2="13" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                  <path d="M16 9a4 4 0 0 1 0 6" />
                  <path d="M18.5 7.5a7 7 0 0 1 0 9" />
                </svg>
              )}
            </button>
          )}

          {/* 再生時間バッジ */}
          <div className={`absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 border border-white/10 transition-all duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            {video.duration}
          </div>

          {/* カテゴリバッジ */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500/20 text-green-300 backdrop-blur-md border border-green-500/30">
              <span className="text-green-400">{categories.find(c => c.id === video.category)?.icon}</span>
              {t(categories.find(c => c.id === video.category)?.label || { JP: '', EN: '' })}
            </span>
          </div>

          {/* 再生中インジケーター */}
          {isPlaying && (
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/90 text-white text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              LIVE
            </div>
          )}

          {/* 下部情報オーバーレイ */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-display text-lg font-bold mb-2 text-white group-hover:text-green-300 transition-colors duration-300 line-clamp-1 tracking-tight">
              {t(video.title)}
            </h3>
            <p className="text-gray-300/90 text-sm leading-relaxed line-clamp-2 mb-3 font-light">
              {t(video.description)}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-2 font-medium">
                <svg className="w-4 h-4 text-green-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {video.date}
              </span>
              <span className={`font-medium transition-colors duration-300 ${isPlaying ? 'text-green-400' : 'text-gray-500 group-hover:text-green-400/80'}`}>
                {isPlaying ? t({ JP: '再生中', EN: 'Playing' }) : t({ JP: 'タップで再生', EN: 'Tap to play' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// フィーチャード縦長動画カード
function FeaturedVerticalVideoCard({ video }: { video: VideoItem }) {
  const { t } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
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

  const handleVideoEnd = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div 
      className="group cursor-pointer relative max-w-sm mx-auto opacity-0 animate-slide-in-bottom"
      style={{ animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 大きなグローエフェクト */}
      <div className={`absolute -inset-4 bg-gradient-to-r from-green-500/40 via-emerald-400/30 to-green-500/40 rounded-[2rem] blur-2xl transition-all duration-700 ${isHovered ? 'opacity-100 scale-105' : 'opacity-50'}`} />
      
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900/95 to-black border-2 border-green-500/30 transition-all duration-500 hover:border-green-400/60 hover:shadow-2xl hover:shadow-green-500/30 animate-border-glow">
        
        {/* フィーチャードバッジ */}
        <div className="absolute top-5 left-5 z-20">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-500/40">
            <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </span>
        </div>

        {/* 縦長動画エリア */}
        <div 
          className="relative w-full overflow-hidden" 
          style={{ aspectRatio: '9/16', maxHeight: '75vh' }}
          onClick={handlePlay}
        >
          {/* サムネイル */}
          <img
            src={video.thumbnail}
            alt={t(video.title)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'opacity-0 scale-110' : 'opacity-100'} ${isHovered && !isPlaying ? 'scale-105 brightness-110' : 'scale-100'}`}
          />
          
          {/* 動画プレーヤー */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            src={video.videoUrl}
            muted={isMuted}
            playsInline
            onEnded={handleVideoEnd}
            preload="metadata"
          />

          {/* グラデーションオーバーレイ */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent transition-opacity duration-500 ${isPlaying ? 'opacity-50' : 'opacity-80'}`} />
          <div className={`absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-emerald-500/10 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
          
          {/* 再生ボタン */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
            <div className={`relative transition-all duration-500 ${isHovered && !isPlaying ? 'scale-110' : 'scale-100'}`}>
              <div className={`absolute inset-0 bg-green-400 rounded-full blur-2xl transition-opacity duration-500 ${isHovered ? 'opacity-80' : 'opacity-40'}`} />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/50 backdrop-blur-sm border-2 border-white/20">
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-9 h-9">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="w-9 h-9 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </div>
            </div>
          </div>

          {/* ミュートボタン */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute bottom-32 right-5 w-12 h-12 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-white hover:bg-green-500/80 transition-all duration-300 z-10 border border-white/10"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                  <line x1="16" y1="9" x2="20" y2="13" />
                  <line x1="20" y1="9" x2="16" y2="13" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                  <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                  <path d="M16 9a4 4 0 0 1 0 6" />
                  <path d="M18.5 7.5a7 7 0 0 1 0 9" />
                </svg>
              )}
            </button>
          )}

          {/* 再生時間バッジ */}
          <div className={`absolute top-5 right-5 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-semibold text-white border border-white/10 transition-all duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            {video.duration}
          </div>

          {/* 再生中インジケーター */}
          {isPlaying && (
            <div className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold backdrop-blur-md shadow-lg shadow-red-500/30">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              PLAYING
            </div>
          )}

          {/* 下部情報オーバーレイ */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
            <div className="mb-3">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-500/20 text-green-300 backdrop-blur-md border border-green-500/30">
                <span className="text-green-400">{categories.find(c => c.id === video.category)?.icon}</span>
                {t(categories.find(c => c.id === video.category)?.label || { JP: '', EN: '' })}
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold mb-3 text-white group-hover:text-green-300 transition-colors duration-300 tracking-tight">
              {t(video.title)}
            </h3>
            <p className="text-gray-300/90 text-base leading-relaxed mb-4 font-light">
              {t(video.description)}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-gray-400 font-medium">
                <svg className="w-4 h-4 text-green-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {video.date}
              </span>
              <span className={`font-semibold transition-colors duration-300 ${isPlaying ? 'text-green-400' : 'text-gray-500 group-hover:text-green-400'}`}>
                {isPlaying ? t({ JP: '再生中', EN: 'Playing' }) : t({ JP: 'タップで再生', EN: 'Tap to play' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// メインギャラリーページ
export default function GalleryPage() {
  const { t, language, setLanguage } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredVideos = selectedCategory === 'all'
    ? videoData
    : videoData.filter(v => v.category === selectedCategory)

  const featuredVideo = filteredVideos.find(v => v.featured)
  const regularVideos = filteredVideos.filter(v => !v.featured)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="fixed inset-0 pointer-events-none">
        {/* グラデーションメッシュ */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        
        {/* ノイズテクスチャ */}
        <div className="absolute inset-0 noise-overlay" />
        
        {/* 装飾的なグロー */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse-glow animation-delay-500" />
      </div>

      {/* ヘッダー */}
      <header className="relative z-50 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <img src="/mazavege_logo_midori.png" alt="Logo" className="relative w-10 h-10 object-contain" />
            </div>
            <span className="font-display text-xl font-bold text-white group-hover:text-green-300 transition-colors">
              MAZAVEGE
            </span>
          </Link>
          
          {/* 言語切替 */}
          <button
            onClick={() => setLanguage(language === 'JP' ? 'EN' : 'JP')}
            className="px-4 py-2 rounded-xl bg-gray-900/80 backdrop-blur-md border border-gray-700/50 text-sm font-semibold text-white hover:border-green-400/50 hover:text-green-300 transition-all duration-300"
          >
            {language === 'JP' ? 'EN' : 'JP'}
          </button>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="relative z-10 px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          
          {/* ヒーローセクション */}
          <section className="text-center py-16 md:py-24">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-green-400 blur-3xl opacity-20 animate-pulse" />
              <h1 className="relative font-display text-5xl md:text-7xl font-bold tracking-tight">
                <span className="text-white">ANIME</span>
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> GALLERY</span>
              </h1>
            </div>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {t({ 
                JP: 'マザーベジタブルの世界観を描いたアニメーションコレクション', 
                EN: 'Animation collection depicting the world of Mother Vegetable' 
              })}
            </p>
            
            {/* 装飾ライン */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-green-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-green-500/50" />
            </div>
          </section>

          {/* カテゴリフィルター */}
          <section className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`group relative px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black shadow-lg shadow-green-500/30'
                      : 'bg-gray-900/60 backdrop-blur-md border border-gray-700/50 text-gray-300 hover:border-green-400/50 hover:text-green-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={selectedCategory === cat.id ? 'text-black' : 'text-green-400'}>{cat.icon}</span>
                    {t(cat.label)}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* フィーチャード動画 */}
          {featuredVideo && (
            <section className="mb-16">
              <FeaturedVerticalVideoCard video={featuredVideo} />
            </section>
          )}

          {/* 動画グリッド */}
          <section>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {regularVideos.map((video, index) => (
                <VerticalVideoCard key={video.id} video={video} index={index} />
              ))}
            </div>
            
            {filteredVideos.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  {t({ JP: '動画が見つかりません', EN: 'No videos found' })}
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* フッター */}
      <footer className="relative z-10 border-t border-gray-800/50 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Mother Vegetable Project. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
