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
  { id: 'all', label: { JP: 'すべて', EN: 'All' }, icon: '◈' },
  { id: 'story', label: { JP: 'ストーリー', EN: 'Story' }, icon: '◇' },
  { id: 'business', label: { JP: 'ビジネス', EN: 'Business' }, icon: '◆' },
  { id: 'sports', label: { JP: 'スポーツ', EN: 'Sports' }, icon: '◈' },
  { id: 'other', label: { JP: 'その他', EN: 'Other' }, icon: '○' }
]

// 縦長動画カード（9:16対応）
function VerticalVideoCard({ video, index }: { video: VideoItem; index: number }) {
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

  const handleVideoEnd = () => {
    setIsPlaying(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  return (
    <div
      className="group cursor-pointer animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-900/40 backdrop-blur-md border border-green-500/20 rounded-2xl overflow-hidden transition-all duration-500 hover:border-green-400/50 hover:shadow-xl hover:shadow-green-500/10">
        {/* 9:16縦長動画エリア */}
        <div 
          className="relative w-full overflow-hidden" 
          style={{ aspectRatio: '9/16' }}
          onClick={handlePlay}
        >
          {/* サムネイル（動画再生前） */}
          <img
            src={video.thumbnail}
            alt={t(video.title)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
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
          <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-30' : 'opacity-70'}`} />
          
          {/* 再生/一時停止ボタン */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-400 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
            <div className="w-16 h-16 rounded-full bg-green-500/90 flex items-center justify-center backdrop-blur-sm transform transition-all duration-300 scale-90 group-hover:scale-100 shadow-lg shadow-green-500/30">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>

          {/* ミュートボタン（再生中のみ表示） */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute bottom-20 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-green-500/80 transition-all duration-300 z-10"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                  <line x1="16" y1="9" x2="20" y2="13" />
                  <line x1="20" y1="9" x2="16" y2="13" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                  <path d="M16 9a4 4 0 0 1 0 6" />
                  <path d="M18.5 7.5a7 7 0 0 1 0 9" />
                </svg>
              )}
            </button>
          )}

          {/* 再生時間バッジ */}
          <div className={`absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-medium text-white transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            {video.duration}
          </div>

          {/* カテゴリバッジ */}
          <div className="absolute top-3 left-3">
            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-green-500/20 text-green-400 backdrop-blur-sm border border-green-500/30">
              {t(categories.find(c => c.id === video.category)?.label || { JP: '', EN: '' })}
            </span>
          </div>

          {/* 再生中インジケーター */}
          {isPlaying && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/90 text-white text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              LIVE
            </div>
          )}

          {/* 下部情報オーバーレイ */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <h3 className="text-lg font-bold mb-1 text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-1">
              {t(video.title)}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-2">
              {t(video.description)}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {video.date}
              </span>
              <span className="text-green-400/80 group-hover:text-green-400 transition-colors duration-300">
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
    <div className="group cursor-pointer relative max-w-md mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border-2 border-green-500/40 transition-all duration-500 hover:border-green-400/60 hover:shadow-2xl hover:shadow-green-500/20">
        {/* フィーチャードバッジ */}
        <div className="absolute top-4 left-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-green-500/30">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Featured
          </span>
        </div>

        {/* 再生中インジケーター */}
        {isPlaying && (
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/90 text-white text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            PLAYING
          </div>
        )}

        {/* 9:16縦長動画エリア */}
        <div 
          className="relative w-full overflow-hidden" 
          style={{ aspectRatio: '9/16', maxHeight: '70vh' }}
          onClick={handlePlay}
        >
          {/* サムネイル */}
          <img
            src={video.thumbnail}
            alt={t(video.title)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'opacity-0 scale-105' : 'opacity-100 scale-100 group-hover:scale-105'}`}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          
          {/* 再生/一時停止ボタン */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
            <div className="w-20 h-20 rounded-full bg-green-500/90 flex items-center justify-center backdrop-blur-sm transform transition-transform duration-300 hover:scale-110 shadow-xl shadow-green-500/40">
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-10 h-10 ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </div>
          </div>

          {/* ミュートボタン */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="absolute bottom-32 right-4 w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-green-500/80 transition-all duration-300 z-10"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                  <line x1="16" y1="9" x2="20" y2="13" />
                  <line x1="20" y1="9" x2="16" y2="13" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M4 9v6h3l4 3V6l-4 3H4z" />
                  <path d="M16 9a4 4 0 0 1 0 6" />
                  <path d="M18.5 7.5a7 7 0 0 1 0 9" />
                </svg>
              )}
            </button>
          )}

          {/* 再生時間 */}
          <div className={`absolute top-4 right-4 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm font-medium text-white flex items-center gap-2 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {video.duration}
          </div>

          {/* 下部情報 */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
            <div className="mb-3">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30">
                {t(categories.find(c => c.id === video.category)?.label || { JP: '', EN: '' })}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent">
              {t(video.title)}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
              {t(video.description)}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {video.date}
              </span>
              <span className="text-green-400">
                {isPlaying ? t({ JP: '再生中', EN: 'Playing' }) : t({ JP: 'タップで再生', EN: 'Tap to play' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const { t, language, setLanguage } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')

  // フィーチャード動画
  const featuredVideo = videoData.find(v => v.featured)
  
  // フィルタリングされた動画（フィーチャード以外）
  const filteredVideos = (selectedCategory === 'all'
    ? videoData
    : videoData.filter(v => v.category === selectedCategory)
  ).filter(v => !v.featured)

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* カスタムスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* 背景装飾 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-b border-green-500/20" style={{ zIndex: 1100 }}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center group">
              <Image
                src="/logo-uCgt3dQ.png"
                alt="MOTHER VEGETABLE"
                width={100}
                height={100}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <nav className="flex items-center gap-2">
              <Link
                href="/"
                className="px-4 py-2 text-sm text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <button
                onClick={() => setLanguage(language === 'EN' ? 'JP' : 'EN')}
                className="px-4 py-2 text-sm text-green-400 hover:text-green-300 transition-colors duration-300 border border-green-500/30 rounded-lg hover:border-green-400/50 hover:bg-green-500/10"
              >
                {language === 'EN' ? 'EN' : 'JP'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="relative pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* ヒーローセクション */}
          <div className="text-center mb-12 pt-8">
            <div className="mb-6 animate-float">
              <Image
                src="/mazavege_logo_midori.png"
                alt="Mother Vegetable Logo"
                width={80}
                height={80}
                className="mx-auto drop-shadow-[0_0_30px_rgba(74,222,128,0.3)]"
              />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
                {t({ JP: 'マザベジアニメ', EN: 'Mazavege Anime' })}
              </span>
              <br />
              <span className="text-white/90 text-2xl md:text-3xl lg:text-4xl font-light">
                {t({ JP: 'ギャラリー', EN: 'Gallery' })}
              </span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              {t({
                JP: '9:16縦長フォーマットのアニメーションコレクション',
                EN: 'Animation collection in 9:16 vertical format'
              })}
            </p>
            <p className="text-green-400/80 text-sm mt-3">
              {t({
                JP: '※ タップすると動画が再生されます',
                EN: '※ Tap to play video'
              })}
            </p>
            {/* 装飾ライン */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-green-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-green-500/50" />
            </div>
          </div>

          {/* カテゴリフィルター */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-400 text-black shadow-lg shadow-green-500/30'
                    : 'bg-gray-900/60 text-gray-300 hover:text-white border border-green-500/20 hover:border-green-400/40 hover:bg-gray-800/60'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className={`transition-transform duration-300 ${selectedCategory === category.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                    {category.icon}
                  </span>
                  {t(category.label)}
                </span>
              </button>
            ))}
          </div>

          {/* フィーチャード動画 */}
          {featuredVideo && selectedCategory === 'all' && (
            <div className="mb-12">
              <FeaturedVerticalVideoCard video={featuredVideo} />
            </div>
          )}

          {/* 縦長動画グリッド - 2列または3列 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredVideos.map((video, index) => (
              <VerticalVideoCard
                key={video.id}
                video={video}
                index={index}
              />
            ))}
          </div>

          {/* 動画がない場合 */}
          {filteredVideos.length === 0 && !featuredVideo && (
            <div className="text-center py-20">
              <div className="inline-block p-8 rounded-2xl bg-gray-900/50 border border-green-500/20">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 text-lg">
                  {t({
                    JP: 'このカテゴリの動画はまだありません',
                    EN: 'No videos in this category yet'
                  })}
                </p>
              </div>
            </div>
          )}

          {/* 追加予定のお知らせ */}
          <div className="mt-16 text-center">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-gray-900/80 backdrop-blur-md border border-green-500/30 rounded-2xl p-6 md:p-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <h3 className="text-green-400 text-lg md:text-xl font-bold">
                    {t({ JP: '新しいアニメを準備中！', EN: 'New animations coming soon!' })}
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <p className="text-gray-400 text-sm md:text-base">
                  {t({
                    JP: 'マザベジちゃんの冒険はまだまだ続きます。お楽しみに！',
                    EN: "Mazavege-chan's adventures continue. Stay tuned!"
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* フッター */}
      <footer className="relative bg-black border-t border-green-500/20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mb-4" />
            <Image
              src="/mazavege_logo_midori.png"
              alt="Mother Vegetable Logo"
              width={32}
              height={32}
              className="mx-auto mb-2 opacity-80"
            />
            <p className="text-green-500/80 text-xs">
              © 2025 MOTHER VEGETABLE PROJECT. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Mazavege-chan Fixed GIF */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center group">
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl group-hover:bg-green-500/30 transition-all duration-300" />
          <img
            src="/mazavegechan.gif"
            alt="Mazavege-chan"
            className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-green-500/30 group-hover:border-green-400/50 transition-all duration-300"
          />
        </div>
        <div className="text-white text-xs text-center mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-medium text-[10px]">Mazavege-chan</p>
          <p className="text-green-400/80 text-[8px]">AI Agent Coming Soon!!</p>
        </div>
      </div>
    </main>
  )
}
