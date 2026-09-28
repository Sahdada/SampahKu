'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [laporan, setLaporan] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    fetchLaporan(parsedUser)
  }, [])

  async function fetchLaporan(user) {
    try {
      const token = localStorage.getItem('token')
      const url = user.role === 'admin' 
        ? '/api/sampah' 
        : `/api/sampah?userId=${user.id}`
      
      const res = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setLaporan(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  function getStatusBadge(status) {
    const badges = {
      pending: 'badge-pending',
      diverifikasi: 'badge-diverifikasi',
      dijual: 'badge-dijual',
      ditukar: 'badge-ditukar'
    }
    return badges[status] || 'badge-pending'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    )
  }

  const stats = {
    total: laporan.length,
    pending: laporan.filter(l => l.status === 'pending').length,
    selesai: laporan.filter(l => l.status !== 'pending').length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Tombol Kembali & Logout */}
      <div className="flex justify-between items-center mb-6">
        <Link 
          href="/" 
          className="text-emerald-600 font-bold hover:underline flex items-center gap-2"
        >
          ← Kembali ke Beranda
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-2xl transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* Welcome Section */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-emerald-200/50 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-black text-emerald-800">
              Halo, {user?.nama}! 👋
            </h2>
            <p className="text-gray-500 font-medium">Selamat datang di dashboard SampahKu</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-bold">
                🎭 {user?.role}
              </span>
              <span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-bold">
                ⭐ {user?.poin || 0} Poin
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/laporan/tambah" 
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 transition-all duration-300 text-center"
            >
              + Setor Sampah
            </Link>
            <Link 
              href="/tukar-poin" 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-purple-600/30 transition-all duration-300 text-center"
            >
              🔄 Tukar Poin
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-emerald-200/50">
          <div className="text-3xl mb-2">📦</div>
          <h3 className="text-sm font-bold text-gray-500">Total Laporan</h3>
          <p className="text-3xl font-black text-emerald-800">{stats.total}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-emerald-200/50">
          <div className="text-3xl mb-2">⏳</div>
          <h3 className="text-sm font-bold text-gray-500">Pending</h3>
          <p className="text-3xl font-black text-emerald-800">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-emerald-200/50">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="text-sm font-bold text-gray-500">Selesai</h3>
          <p className="text-3xl font-black text-emerald-800">{stats.selesai}</p>
        </div>
      </div>

      {/* Recent Laporan List */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-emerald-200/50">
        <h3 className="text-xl font-black text-emerald-800 mb-4">📋 Riwayat Laporan</h3>
        
        {laporan.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-4xl mb-2">🌱</p>
            <p className="font-medium">Belum ada laporan sampah.</p>
            <Link href="/laporan/tambah" className="text-emerald-600 font-bold hover:underline">
              Mulai lapor sekarang!
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-500">Tanggal</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-500">Jenis</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-500">Berat</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-500">Wilayah</th>
                  <th className="text-left py-3 px-4 text-sm font-bold text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {laporan.slice(0, 5).map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-emerald-50/50 transition">
                    <td className="py-3 px-4 text-sm font-medium">
                      {new Date(item.tanggalLapor).toLocaleDateString('id-ID')}
                    </td>
                    <td className="py-3 px-4 font-medium">{item.jenisSampah?.namaJenis || '-'}</td>
                    <td className="py-3 px-4 font-medium">{item.berat} kg</td>
                    <td className="py-3 px-4 font-medium">{item.wilayah?.namaWilayah || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`badge ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ✅ ADMIN PANEL - DENGAN TOMBOL VERIFIKASI */}
      {user?.role === 'admin' && (
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 shadow-2xl mt-8">
          <h3 className="text-xl font-black text-white mb-2">🛡️ Panel Admin</h3>
          <p className="text-emerald-100 font-medium mb-4">Kelola semua laporan sampah dari nasabah.</p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/admin/verifikasi" 
              className="bg-white text-emerald-700 font-bold px-6 py-3 rounded-2xl hover:bg-emerald-50 transition"
            >
              ✅ Verifikasi Laporan
            </Link>
            <Link 
              href="/admin/laporan" 
              className="bg-white/20 text-white font-bold px-6 py-3 rounded-2xl hover:bg-white/30 transition border border-white/20"
            >
              📋 Semua Laporan
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}