'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nama: '',
    email: '',
    password: '',
    noHp: '',
    alamat: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Registrasi gagal')

      // ✅ LANGSUNG KE HALAMAN LOGIN
      router.push('/login')
      
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-white to-emerald-100/50">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 max-w-md w-full shadow-2xl border border-emerald-200/50">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌱</div>
          <h2 className="text-3xl font-black text-emerald-800">Daftar Akun</h2>
          <p className="text-gray-500 font-medium mt-1">Jadi pahlawan lingkungan!</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-4 text-sm font-medium">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-emerald-800 mb-1">Nama Lengkap *</label>
            <input
              type="text"
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-emerald-800 mb-1">Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-emerald-800 mb-1">Password *</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-emerald-800 mb-1">No HP</label>
            <input
              type="text"
              value={form.noHp}
              onChange={(e) => setForm({ ...form, noHp: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none"
              placeholder="08123456789"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-emerald-800 mb-1">Alamat</label>
            <textarea
              value={form.alamat}
              onChange={(e) => setForm({ ...form, alamat: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 transition-all outline-none"
              rows="2"
              placeholder="Jl. ..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-emerald-600/30 disabled:opacity-50"
          >
            {loading ? '⏳ Loading...' : '🌿 Daftar'}
          </button>
        </form>

        <p className="text-center text-gray-500 font-medium mt-6">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-emerald-600 font-bold hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  )
}