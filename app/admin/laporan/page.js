'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLaporanPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [laporan, setLaporan] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('semua')
  const [selectedLaporan, setSelectedLaporan] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      router.push('/dashboard')
      return
    }
    
    setUser(parsedUser)
    fetchLaporan()
  }, [])

  async function fetchLaporan() {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/sampah', {
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

  const handleUpdateStatus = async (id, status, tipeTransaksi = null) => {
    try {
      const token = localStorage.getItem('token')
      
      const payload = { id, status }
      if (tipeTransaksi) {
        payload.tipeTransaksi = tipeTransaksi
      }

      const res = await fetch('/api/sampah', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengupdate status')
      }

      alert(`✅ Laporan berhasil ${status === 'diverifikasi' ? 'diverifikasi' : status === 'dijual' ? 'dijual' : status === 'ditukar' ? 'ditukar' : 'diupdate'}!`)
      setShowModal(false)
      fetchLaporan()
    } catch (error) {
      alert('❌ ' + error.message)
    }
  }

  function getStatusBadge(status) {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      diverifikasi: 'bg-blue-100 text-blue-800',
      dijual: 'bg-green-100 text-green-800',
      ditukar: 'bg-purple-100 text-purple-800'
    }
    return badges[status] || 'bg-gray-100 text-gray-800'
  }

  const filteredLaporan = filter === 'semua' 
    ? laporan 
    : laporan.filter(l => l.status === filter)

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <Link href="/dashboard" className="text-emerald-600 font-bold hover:underline flex items-center gap-2">
            ← Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-black text-emerald-800 mt-2">🛡️ Kelola Laporan</h1>
          <p className="text-gray-500 font-medium">Verifikasi dan proses laporan sampah dari nasabah</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-2xl transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 text-center shadow-md border border-emerald-200/50">
          <p className="text-2xl font-black text-emerald-800">{laporan.length}</p>
          <p className="text-sm font-bold text-gray-500">Total</p>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-4 text-center shadow-md border border-yellow-200/50">
          <p className="text-2xl font-black text-yellow-800">{laporan.filter(l => l.status === 'pending').length}</p>
          <p className="text-sm font-bold text-yellow-700">Pending</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 text-center shadow-md border border-blue-200/50">
          <p className="text-2xl font-black text-blue-800">{laporan.filter(l => l.status === 'diverifikasi').length}</p>
          <p className="text-sm font-bold text-blue-700">Diverifikasi</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 text-center shadow-md border border-green-200/50">
          <p className="text-2xl font-black text-green-800">{laporan.filter(l => l.status === 'dijual' || l.status === 'ditukar').length}</p>
          <p className="text-sm font-bold text-green-700">Selesai</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('semua')}
          className={`px-4 py-2 rounded-2xl font-bold transition ${
            filter === 'semua' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          📋 Semua
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-2xl font-bold transition ${
            filter === 'pending' 
              ? 'bg-yellow-500 text-white' 
              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
          }`}
        >
          ⏳ Pending
        </button>
        <button
          onClick={() => setFilter('diverifikasi')}
          className={`px-4 py-2 rounded-2xl font-bold transition ${
            filter === 'diverifikasi' 
              ? 'bg-blue-600 text-white' 
              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          }`}
        >
          ✅ Diverifikasi
        </button>
        <button
          onClick={() => setFilter('dijual')}
          className={`px-4 py-2 rounded-2xl font-bold transition ${
            filter === 'dijual' 
              ? 'bg-green-600 text-white' 
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          💰 Dijual
        </button>
        <button
          onClick={() => setFilter('ditukar')}
          className={`px-4 py-2 rounded-2xl font-bold transition ${
            filter === 'ditukar' 
              ? 'bg-purple-600 text-white' 
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
          }`}
        >
          🔄 Ditukar
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl p-6 shadow-2xl border border-emerald-200/50 overflow-x-auto">
        {filteredLaporan.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-6xl mb-4">📭</p>
            <p className="font-medium">Belum ada laporan dengan status ini</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Tanggal</th>
                <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Nasabah</th>
                <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Jenis</th>
                <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Berat</th>
                <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Wilayah</th>
                <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Status</th>
                <th className="text-left py-3 px-3 text-sm font-bold text-gray-500">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredLaporan.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-emerald-50/50 transition">
                  <td className="py-3 px-3 text-sm font-medium">
                    {new Date(item.tanggalLapor).toLocaleDateString('id-ID')}
                  </td>
                  <td className="py-3 px-3 font-medium">{item.user?.nama || '-'}</td>
                  <td className="py-3 px-3">{item.jenisSampah?.namaJenis || '-'}</td>
                  <td className="py-3 px-3 font-medium">{item.berat} kg</td>
                  <td className="py-3 px-3 font-medium">{item.wilayah?.namaWilayah || '-'}</td>
                  <td className="py-3 px-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {item.status === 'pending' && (
                      <button
                        onClick={() => {
                          setSelectedLaporan(item)
                          setShowModal(true)
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-xl text-xs transition"
                      >
                        Proses
                      </button>
                    )}
                    {item.status === 'diverifikasi' && (
                      <span className="text-gray-400 text-xs font-medium">Menunggu transaksi</span>
                    )}
                    {(item.status === 'dijual' || item.status === 'ditukar') && (
                      <span className="text-green-600 text-xs font-medium">✅ Selesai</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Proses Laporan */}
      {showModal && selectedLaporan && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-black text-emerald-800 mb-4">🛡️ Proses Laporan</h3>
            
            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
              <p className="text-sm text-gray-500">
                <span className="font-bold">Nasabah:</span> {selectedLaporan.user?.nama}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Jenis:</span> {selectedLaporan.jenisSampah?.namaJenis}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Berat:</span> {selectedLaporan.berat} kg
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-bold">Wilayah:</span> {selectedLaporan.wilayah?.namaWilayah}
              </p>
              {selectedLaporan.catatan && (
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-bold">Catatan:</span> {selectedLaporan.catatan}
                </p>
              )}
              {selectedLaporan.foto && (
                <div className="mt-2">
                  <img 
                    src={selectedLaporan.foto.imageUrl} 
                    alt="Foto sampah" 
                    className="max-h-32 rounded-xl object-cover border border-gray-200"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleUpdateStatus(selectedLaporan.id, 'diverifikasi')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl transition"
              >
                ✅ Verifikasi
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedLaporan.id, 'dijual', 'jual')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-2xl transition"
              >
                💰 Jual
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedLaporan.id, 'ditukar', 'tukar')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl transition"
              >
                🔄 Tukar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-2xl transition"
              >
                ❌ Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}