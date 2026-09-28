'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <div className="min-h-[90vh] bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50 flex items-center">
      <div className="container mx-auto px-4 py-12">
        
        {/* HERO */}
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block p-4 bg-emerald-500/10 rounded-3xl mb-6">
            <span className="text-7xl">♻️</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tight">
            <span className="text-emerald-800">Sampah</span>
            <span className="text-emerald-500">Ku</span>
          </h1>
          
          <p className="text-2xl font-bold text-emerald-700 mb-3">🌿 Kelola Sampah Jadi Berkah</p>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
            Platform digital untuk mengelola sampah di seluruh wilayah Jakarta.
            Setor, tukar, dan dapatkan keuntungan.
          </p>
        </div>

        {/* TOMBOL */}
        <div className="flex flex-wrap gap-4 justify-center mt-10 mb-12">
          {isLoggedIn ? (
            <Link href="/dashboard" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all duration-300 flex items-center gap-2">
              🚀 Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all duration-300 flex items-center gap-2">
                🔑 Login
              </Link>
              <Link href="/register" className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-4 px-10 rounded-2xl border-2 border-emerald-400 transition-all duration-300 flex items-center gap-2">
                🌱 Daftar
              </Link>
            </>
          )}
        </div>

        {/* FITUR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-emerald-100/50">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">📝</div>
            <h3 className="text-lg font-extrabold text-emerald-800">Lapor Sampah</h3>
            <p className="text-gray-500 text-sm mt-2">Catat jenis, berat, dan lokasi sampah di Jakarta</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-emerald-100/50">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">💰</div>
            <h3 className="text-lg font-extrabold text-emerald-800">Dapat Uang</h3>
            <p className="text-gray-500 text-sm mt-2">Jual sampah dapatkan rupiah</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-emerald-100/50">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">⭐</div>
            <h3 className="text-lg font-extrabold text-emerald-800">Tukar Poin</h3>
            <p className="text-gray-500 text-sm mt-2">Kumpulkan poin jadi hadiah</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center mt-16 text-sm text-gray-400 border-t border-gray-200/50 pt-6">
          © 2026 SampahKu — Jakarta
        </div>
      </div>
    </div>
  )
}