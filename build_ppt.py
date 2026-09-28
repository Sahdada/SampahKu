import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

# Paths
BASE_DIR = os.getcwd()
SCREENSHOT_DIR = os.path.join(BASE_DIR, "manual_screenshots")
OUTPUT_PPTX = os.path.join(BASE_DIR, "User_Manual_SampahKu.pptx")

# Color Palette (Matching SampahKu Website Theme: Emerald, Mint, Gold, Slate)
DARK_EMERALD = RGBColor(4, 57, 39)        # #043927 (Main Cover & Section BG)
MID_EMERALD = RGBColor(6, 78, 59)         # #064E3B (Section Headings)
ACCENT_GREEN = RGBColor(5, 150, 105)      # #059669 (Primary Action Green)
LIGHT_GREEN_BG = RGBColor(240, 253, 244)  # #F0FDF4 (Slide Background)
WHITE = RGBColor(255, 255, 255)
DARK_TEXT = RGBColor(17, 24, 39)         # #111827 (Body Text)
MUTED_TEXT = RGBColor(75, 85, 99)        # #4B5563 (Subtext / Descriptions)
BORDER_COLOR = RGBColor(209, 250, 229)    # #D1FAE5 (Card Borders)
MINT_ACCENT = RGBColor(167, 243, 208)     # #A7F3D0 (Highlights & Badges)
GOLD_ACCENT = RGBColor(245, 158, 11)      # #F59E0B (Points & Rewards Accent)
CARD_BG = RGBColor(255, 255, 255)

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    def add_background(slide, color):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()
        return bg

    def add_header_decorations(slide, text="SAMPAHKU DIGITAL PLATFORM"):
        # Top subtitle tag
        txBox = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.4))
        tf = txBox.text_frame
        p = tf.paragraphs[0]
        p.text = text.upper()
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = ACCENT_GREEN
        p.alignment = PP_ALIGN.LEFT

        # Top Right Sparkle
        sp = slide.shapes.add_textbox(Inches(12.2), Inches(0.35), Inches(0.4), Inches(0.4))
        sp.text_frame.text = "✦"
        sp.text_frame.paragraphs[0].font.size = Pt(14)
        sp.text_frame.paragraphs[0].font.color.rgb = ACCENT_GREEN

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=BORDER_COLOR):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1.5)
        else:
            card.line.fill.background()
        return card

    # ==========================================
    # SLIDE 1: TITLE SLIDE (Matching Uploaded Image Design Style)
    # ==========================================
    slide1 = prs.slides.add_slide(blank_layout)
    add_background(slide1, DARK_EMERALD)

    # Top-Left line & star accent
    line1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.8), Inches(3.5), Inches(0.02))
    line1.fill.solid()
    line1.fill.fore_color.rgb = WHITE
    line1.line.fill.background()

    star1 = slide1.shapes.add_textbox(Inches(4.35), Inches(0.65), Inches(0.4), Inches(0.4))
    star1.text_frame.text = "✦"
    star1.text_frame.paragraphs[0].font.size = Pt(16)
    star1.text_frame.paragraphs[0].font.color.rgb = WHITE

    # Bottom-Right line & star accent
    star2 = slide1.shapes.add_textbox(Inches(8.6), Inches(6.55), Inches(0.4), Inches(0.4))
    star2.text_frame.text = "✦"
    star2.text_frame.paragraphs[0].font.size = Pt(16)
    star2.text_frame.paragraphs[0].font.color.rgb = WHITE

    line2 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(9.0), Inches(6.7), Inches(3.5), Inches(0.02))
    line2.fill.solid()
    line2.fill.fore_color.rgb = WHITE
    line2.line.fill.background()

    # Center Text Container
    tx = slide1.shapes.add_textbox(Inches(1.5), Inches(1.8), Inches(10.333), Inches(4.0))
    tf = tx.text_frame
    tf.word_wrap = True

    p0 = tf.paragraphs[0]
    p0.text = "SAMPAHKU DIGITAL PLATFORM"
    p0.font.size = Pt(16)
    p0.font.bold = True
    p0.font.color.rgb = MINT_ACCENT
    p0.alignment = PP_ALIGN.CENTER
    p0.space_after = Pt(15)

    p1 = tf.add_paragraph()
    p1.text = "USER MANUAL"
    p1.font.size = Pt(56)
    p1.font.bold = True
    p1.font.color.rgb = WHITE
    p1.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "✦ PANDUAN PENGGUNAAN WEBSITE ✦"
    p2.font.size = Pt(36)
    p2.font.bold = True
    p2.font.color.rgb = MINT_ACCENT
    p2.alignment = PP_ALIGN.CENTER
    p2.space_after = Pt(25)

    p3 = tf.add_paragraph()
    p3.text = "PANDUAN LENGKAP LAKU OPERASIONAL UNTUK 2 ROLE: NASABAH & ADMIN"
    p3.font.size = Pt(13)
    p3.font.bold = True
    p3.font.color.rgb = WHITE
    p3.alignment = PP_ALIGN.CENTER

    # ==========================================
    # SLIDE 2: SYSTEM OVERVIEW & ROLES
    # ==========================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_background(slide2, LIGHT_GREEN_BG)
    add_header_decorations(slide2, "SAMPAHKU PLATFORM OVERVIEW")

    tx = slide2.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.8))
    p = tx.text_frame.paragraphs[0]
    p.text = "Ringkasan Sistem & Peran Pengguna (2 Roles)"
    p.font.size = Pt(26)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # Left Card: Nasabah
    add_card(slide2, Inches(0.8), Inches(1.7), Inches(5.6), Inches(5.2))
    tx_c1 = slide2.shapes.add_textbox(Inches(1.0), Inches(1.9), Inches(5.2), Inches(4.8))
    tf1 = tx_c1.text_frame
    tf1.word_wrap = True
    
    p = tf1.paragraphs[0]
    p.text = "👤 Role 1: Nasabah (Masyarakat)"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD
    p.space_after = Pt(14)

    items_nasabah = [
        ("Registrasi & Login", "Membuat akun baru & mengakses portal pengguna secara aman."),
        ("Dashboard Informasi", "Melihat statistik total laporan, status pending, dan perolehan poin."),
        ("Setor / Lapor Sampah", "Melaporkan jenis sampah, berat (kg), wilayah Jakarta & foto bukti."),
        ("Tukar Poin Hadiah", "Menukarkan poin yang didapat dengan voucher, sembako, pulsa, atau uang tunai.")
    ]
    for title, desc in items_nasabah:
        p = tf1.add_paragraph()
        p.text = f"• {title}"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = DARK_TEXT
        
        p2 = tf1.add_paragraph()
        p2.text = f"  {desc}"
        p2.font.size = Pt(12)
        p2.font.color.rgb = MUTED_TEXT
        p2.space_after = Pt(8)

    # Right Card: Admin
    add_card(slide2, Inches(6.9), Inches(1.7), Inches(5.6), Inches(5.2))
    tx_c2 = slide2.shapes.add_textbox(Inches(7.1), Inches(1.9), Inches(5.2), Inches(4.8))
    tf2 = tx_c2.text_frame
    tf2.word_wrap = True

    p = tf2.paragraphs[0]
    p.text = "🛡️ Role 2: Admin (Pengelola)"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD
    p.space_after = Pt(14)

    items_admin = [
        ("Login Administrator", "Masuk menggunakan hak akses khusus pengelola sistem."),
        ("Monitoring Dashboard", "Memantau seluruh aktivitas penyetoran sampah dari semua nasabah."),
        ("Verifikasi Laporan", "Memeriksa detail foto & data sampah yang masuk dari nasabah."),
        ("Proses Status Sampah", "Mengubah status menjadi Diverifikasi, Dijual, atau Ditukar ke poin.")
    ]
    for title, desc in items_admin:
        p = tf2.add_paragraph()
        p.text = f"• {title}"
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = DARK_TEXT
        
        p2 = tf2.add_paragraph()
        p2.text = f"  {desc}"
        p2.font.size = Pt(12)
        p2.font.color.rgb = MUTED_TEXT
        p2.space_after = Pt(8)

    # ==========================================
    # SLIDE 3: SECTION COVER - ROLE NASABAH
    # ==========================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_background(slide3, DARK_EMERALD)

    # Top-Left line & star accent
    line1 = slide3.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.8), Inches(3.5), Inches(0.02))
    line1.fill.solid()
    line1.fill.fore_color.rgb = WHITE
    line1.line.fill.background()

    star1 = slide3.shapes.add_textbox(Inches(4.35), Inches(0.65), Inches(0.4), Inches(0.4))
    star1.text_frame.text = "✦"
    star1.text_frame.paragraphs[0].font.size = Pt(16)
    star1.text_frame.paragraphs[0].font.color.rgb = WHITE

    tx = slide3.shapes.add_textbox(Inches(1.5), Inches(2.3), Inches(10.333), Inches(3.0))
    tf = tx.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "BAGIAN 1"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = MINT_ACCENT
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(10)

    p1 = tf.add_paragraph()
    p1.text = "PANDUAN ROLE NASABAH"
    p1.font.size = Pt(48)
    p1.font.bold = True
    p1.font.color.rgb = WHITE
    p1.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "✦ Langkah Demi Langkah Menggunakan Fitur Setor Sampah & Tukar Poin ✦"
    p2.font.size = Pt(16)
    p2.font.color.rgb = MINT_ACCENT
    p2.alignment = PP_ALIGN.CENTER

    # ==========================================
    # SLIDE 4: NASABAH - REGISTRASI & LOGIN
    # ==========================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_background(slide4, LIGHT_GREEN_BG)
    add_header_decorations(slide4, "PANDUAN NASABAH — LANGKAH 1")

    tx = slide4.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "1. Pendaftaran (Registrasi) & Login Akun Nasabah"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # Instructions Box
    add_card(slide4, Inches(0.8), Inches(1.5), Inches(4.2), Inches(5.3))
    tx_inst = slide4.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(3.8), Inches(4.9))
    tf = tx_inst.text_frame
    tf.word_wrap = True

    steps = [
        ("1. Buka Halaman Utama", "Akses website SampahKu di browser anda."),
        ("2. Registrasi Akun", "Jika belum memiliki akun, klik '🌱 Daftar' dan isi Form Nama Lengkap, Email, Password, No. HP, dan Alamat."),
        ("3. Login ke Aplikasi", "Masukkan Email dan Password yang telah terdaftar lalu klik tombol '🔑 Login'."),
        ("4. Masuk ke Dashboard", "Setelah berhasil login, anda akan langsung diarahkan ke Dashboard Nasabah.")
    ]
    for st, ds in steps:
        p = tf.add_paragraph() if tf.paragraphs[0].text else tf.paragraphs[0]
        p.text = st
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = ACCENT_GREEN

        p2 = tf.add_paragraph()
        p2.text = ds
        p2.font.size = Pt(11)
        p2.font.color.rgb = MUTED_TEXT
        p2.space_after = Pt(10)

    # Screenshot 1: Login
    img_login = os.path.join(SCREENSHOT_DIR, "02_login.png")
    if os.path.exists(img_login):
        slide4.shapes.add_picture(img_login, Inches(5.2), Inches(1.5), width=Inches(3.6))

    # Screenshot 2: Register
    img_reg = os.path.join(SCREENSHOT_DIR, "03_register.png")
    if os.path.exists(img_reg):
        slide4.shapes.add_picture(img_reg, Inches(9.0), Inches(1.5), width=Inches(3.5))

    # ==========================================
    # SLIDE 5: NASABAH - DASHBOARD OVERVIEW
    # ==========================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_background(slide5, LIGHT_GREEN_BG)
    add_header_decorations(slide5, "PANDUAN NASABAH — LANGKAH 2")

    tx = slide5.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "2. Memahami Dashboard & Perolehan Poin"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # Left Image (Dashboard Screenshot)
    img_dash = os.path.join(SCREENSHOT_DIR, "04_dashboard_nasabah.png")
    if os.path.exists(img_dash):
        slide5.shapes.add_picture(img_dash, Inches(0.8), Inches(1.5), width=Inches(7.2))

    # Right Card: Description
    add_card(slide5, Inches(8.2), Inches(1.5), Inches(4.3), Inches(5.3))
    tx_d = slide5.shapes.add_textbox(Inches(8.4), Inches(1.7), Inches(3.9), Inches(4.9))
    tf = tx_d.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Fitur Utama Dashboard:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD
    p.space_after = Pt(12)

    features = [
        ("⭐ Total Poin Badge", "Menampilkan jumlah poin aktif yang dikumpulkan dari setiap kg sampah yang disetor (1 kg = 10 poin)."),
        ("📦 Kartu Statistik (STATS)", "Menampilkan jumlah Total Laporan, Laporan Pending, dan Laporan Selesai."),
        ("📋 Tabel Riwayat Laporan", "Melihat daftar riwayat laporan sampah beserta tanggal, jenis, berat, wilayah, dan status terkini."),
        ("🚀 Tombol Akses Cepat", "Tombol '+ Setor Sampah' untuk lapor baru dan '🔄 Tukar Poin' untuk klaim hadiah.")
    ]
    for ft, fd in features:
        p = tf.add_paragraph()
        p.text = ft
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = DARK_TEXT

        p2 = tf.add_paragraph()
        p2.text = fd
        p2.font.size = Pt(11)
        p2.font.color.rgb = MUTED_TEXT
        p2.space_after = Pt(8)

    # ==========================================
    # SLIDE 6: NASABAH - CARA SETOR SAMPAH
    # ==========================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_background(slide6, LIGHT_GREEN_BG)
    add_header_decorations(slide6, "PANDUAN NASABAH — LANGKAH 3")

    tx = slide6.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "3. Cara Menyetor / Melaporkan Sampah"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # Left Instructions
    add_card(slide6, Inches(0.8), Inches(1.5), Inches(4.5), Inches(5.3))
    tx_s = slide6.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(4.1), Inches(4.9))
    tf = tx_s.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Langkah Input Form Laporan:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD
    p.space_after = Pt(10)

    setor_steps = [
        ("1. Pilih Jenis Sampah", "Pilih kategori sampah (Kertas, Plastik, Logam, Botol, Organik, dll). Harga/kg ditampilkan di dropdown."),
        ("2. Input Berat Sampah (kg)", "Masukkan estimasi berat sampah (minimal 0.1 kg)."),
        ("3. Pilih Lokasi / Wilayah", "Pilih kecamatan wilayah Jakarta tempat penyetoran sampah."),
        ("4. Catatan & Upload Foto", "Tuliskan rincian tambahan dan sertakan foto bukti kondisi sampah."),
        ("5. Kirim Laporan", "Klik '📤 Kirim Laporan'. Status akan berubah menjadi 'Pending' menunggu verifikasi admin.")
    ]
    for st, ds in setor_steps:
        p = tf.add_paragraph()
        p.text = st
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = ACCENT_GREEN

        p2 = tf.add_paragraph()
        p2.text = ds
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = MUTED_TEXT
        p2.space_after = Pt(6)

    # Right Image
    img_lapor = os.path.join(SCREENSHOT_DIR, "05_lapor_sampah.png")
    if os.path.exists(img_lapor):
        slide6.shapes.add_picture(img_lapor, Inches(5.5), Inches(1.5), width=Inches(7.0))

    # ==========================================
    # SLIDE 7: NASABAH - TUKAR POIN
    # ==========================================
    slide7 = prs.slides.add_slide(blank_layout)
    add_background(slide7, LIGHT_GREEN_BG)
    add_header_decorations(slide7, "PANDUAN NASABAH — LANGKAH 4")

    tx = slide7.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "4. Cara Menukarkan Poin Hadiah & Sembako"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # Left Image
    img_tukar = os.path.join(SCREENSHOT_DIR, "06_tukar_poin.png")
    if os.path.exists(img_tukar):
        slide7.shapes.add_picture(img_tukar, Inches(0.8), Inches(1.5), width=Inches(7.2))

    # Right Instructions
    add_card(slide7, Inches(8.2), Inches(1.5), Inches(4.3), Inches(5.3))
    tx_t = slide7.shapes.add_textbox(Inches(8.4), Inches(1.7), Inches(3.9), Inches(4.9))
    tf = tx_t.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Proses Penukaran Poin:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD
    p.space_after = Pt(10)

    tukar_steps = [
        ("1. Cek Poin Tersedia", "Pastikan saldo poin anda mencukupi sesuai tarif hadiah."),
        ("2. Pilih Hadiah Katalog", "Tersedia pilihan Voucher Belanja, Beras 5kg, Minyak Goreng 2L, Pulsa, hingga Uang Tunai."),
        ("3. Konfirmasi Penukaran", "Klik card hadiah yang diinginkan lalu tekan tombol '🔄 Tukar Sekarang'."),
        ("4. Poin Otomatis Berkurang", "Sistem akan mengurangi poin dan mencatat riwayat transaksi penukaran secara langsung.")
    ]
    for st, ds in tukar_steps:
        p = tf.add_paragraph()
        p.text = st
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = ACCENT_GREEN

        p2 = tf.add_paragraph()
        p2.text = ds
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = MUTED_TEXT
        p2.space_after = Pt(8)

    # ==========================================
    # SLIDE 8: NASABAH - PENJELASAN DETAIL TOMBOL & ELEMEN UI
    # ==========================================
    slide8 = prs.slides.add_slide(blank_layout)
    add_background(slide8, LIGHT_GREEN_BG)
    add_header_decorations(slide8, "PANDUAN NASABAH — DETAIL TOMBOL & UI")

    tx = slide8.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "Panduan Detail Tombol & Elemen UI (Nasabah)"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # 4 Cards in 2x2 Grid
    buttons_nasabah = [
        ("🌱 Tombol 'Daftar'", "Lokasi: Navbar & Landing Page\nFungsi: Membuka formulir pendaftaran akun baru untuk nasabah baru di DKI Jakarta."),
        ("🔑 Tombol 'Login'", "Lokasi: Navbar & Form Auth\nFungsi: Melakukan verifikasi kredensial email & password untuk masuk ke portal."),
        ("🚀 Tombol 'Dashboard'", "Lokasi: Header / Navigation Bar\nFungsi: Mengarahkan pengguna kembali ke halaman utama ringkasan statistik dan poin."),
        ("➕ Tombol '+ Setor Sampah'", "Lokasi: Dashboard Utama\nFungsi: Membuka form penyetoran sampah baru (input jenis, berat, wilayah, foto)."),
        ("📤 Tombol 'Kirim Laporan'", "Lokasi: Halaman Form Setor\nFungsi: Mengirim data penyetoran ke database sistem dengan status awal 'Pending'."),
        ("🔄 Tombol 'Tukar Poin'", "Lokasi: Dashboard & Katalog Hadiah\nFungsi: Membuka halaman katalog penukaran poin & mengeksekusi penukaran hadiah."),
        ("🔄 Tombol 'Tukar Sekarang'", "Lokasi: Card Hadiah Katalog\nFungsi: Mengonfirmasi penukaran poin dengan voucher/sembako pilihan nasabah."),
        ("🚪 Tombol 'Logout'", "Lokasi: Header Kanan Atas\nFungsi: Menghapus session token JWT & keluar secara aman dari akun nasabah.")
    ]

    for idx, (b_title, b_desc) in enumerate(buttons_nasabah):
        col = idx % 2
        row = idx // 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.5 + row * 1.35)
        
        add_card(slide8, left, top, Inches(5.7), Inches(1.25))
        tx_b = slide8.shapes.add_textbox(left + Inches(0.15), top + Inches(0.1), Inches(5.4), Inches(1.05))
        tf = tx_b.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = b_title
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = MID_EMERALD
        
        p2 = tf.add_paragraph()
        p2.text = b_desc
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = DARK_TEXT

    # ==========================================
    # SLIDE 9: SECTION COVER - ROLE ADMIN
    # ==========================================
    slide9 = prs.slides.add_slide(blank_layout)
    add_background(slide9, DARK_EMERALD)

    # Top-Left line & star accent
    line1 = slide9.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.8), Inches(3.5), Inches(0.02))
    line1.fill.solid()
    line1.fill.fore_color.rgb = WHITE
    line1.line.fill.background()

    star1 = slide9.shapes.add_textbox(Inches(4.35), Inches(0.65), Inches(0.4), Inches(0.4))
    star1.text_frame.text = "✦"
    star1.text_frame.paragraphs[0].font.size = Pt(16)
    star1.text_frame.paragraphs[0].font.color.rgb = WHITE

    tx = slide9.shapes.add_textbox(Inches(1.5), Inches(2.3), Inches(10.333), Inches(3.0))
    tf = tx.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "BAGIAN 2"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = MINT_ACCENT
    p.alignment = PP_ALIGN.CENTER
    p.space_after = Pt(10)

    p1 = tf.add_paragraph()
    p1.text = "PANDUAN ROLE ADMIN"
    p1.font.size = Pt(48)
    p1.font.bold = True
    p1.font.color.rgb = WHITE
    p1.alignment = PP_ALIGN.CENTER

    p2 = tf.add_paragraph()
    p2.text = "✦ Pengelolaan, Verifikasi, dan Pemrosesan Database Laporan Sampah ✦"
    p2.font.size = Pt(16)
    p2.font.color.rgb = MINT_ACCENT
    p2.alignment = PP_ALIGN.CENTER

    # ==========================================
    # SLIDE 10: ADMIN - DASHBOARD & NAVIGASI
    # ==========================================
    slide10 = prs.slides.add_slide(blank_layout)
    add_background(slide10, LIGHT_GREEN_BG)
    add_header_decorations(slide10, "PANDUAN ADMIN — LANGKAH 1")

    tx = slide10.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "1. Dashboard Admin & Access Rights"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # Left Image
    img_adash = os.path.join(SCREENSHOT_DIR, "07_dashboard_admin.png")
    if os.path.exists(img_adash):
        slide10.shapes.add_picture(img_adash, Inches(0.8), Inches(1.5), width=Inches(7.2))

    # Right Card
    add_card(slide10, Inches(8.2), Inches(1.5), Inches(4.3), Inches(5.3))
    tx_ad = slide10.shapes.add_textbox(Inches(8.4), Inches(1.7), Inches(3.9), Inches(4.9))
    tf = tx_ad.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Panel Kontrol Admin:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD
    p.space_after = Pt(12)

    admin_features = [
        ("🔑 Credential Admin", "Login menggunakan email admin (admin@sampahku.com) untuk membuka hak akses pengelola."),
        ("🛡️ Banner Panel Admin", "Dashboard admin menampilkan banner khusus berwarna hijau tua dengan akses ke menu pengelolaan."),
        ("✅ Menu Verifikasi", "Dapat langsung menuju halaman verifikasi laporan yang baru masuk dari nasabah."),
        ("📋 Menu Kelola Laporan", "Melihat dan mengelola database seluruh laporan sampah secara komprehensif.")
    ]
    for af, ad in admin_features:
        p = tf.add_paragraph()
        p.text = af
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = DARK_TEXT

        p2 = tf.add_paragraph()
        p2.text = ad
        p2.font.size = Pt(11)
        p2.font.color.rgb = MUTED_TEXT
        p2.space_after = Pt(8)

    # ==========================================
    # SLIDE 11: ADMIN - VERIFIKASI LAPORAN
    # ==========================================
    slide11 = prs.slides.add_slide(blank_layout)
    add_background(slide11, LIGHT_GREEN_BG)
    add_header_decorations(slide11, "PANDUAN ADMIN — LANGKAH 2")

    tx = slide11.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "2. Halaman Verifikasi Laporan Masuk"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # Left Instructions
    add_card(slide11, Inches(0.8), Inches(1.5), Inches(4.3), Inches(5.3))
    tx_av = slide11.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(3.9), Inches(4.9))
    tf = tx_av.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Alur Verifikasi Admin:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD
    p.space_after = Pt(10)

    verif_steps = [
        ("1. Filter Laporan Pending", "Admin memantau daftar laporan dengan status 'Menunggu Verifikasi'."),
        ("2. Periksa Foto & Data", "Verifikasi kebenaran foto sampah, berat (kg), jenis, dan lokasi nasabah."),
        ("3. Tombol Aksi Cepat", "Tersedia 3 pilihan aksi langsung di tabel:"),
        ("   • ✅ Verifikasi", "Menyetujui validitas laporan sampah."),
        ("   • 💰 Jual", "Memproses sampah untuk dijual langsung."),
        ("   • 🔄 Tukar", "Mengonversi sampah menjadi poin nasabah.")
    ]
    for st, ds in verif_steps:
        p = tf.add_paragraph()
        p.text = st
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = ACCENT_GREEN if "1." in st or "2." in st or "3." in st else DARK_TEXT

        if ds:
            p2 = tf.add_paragraph()
            p2.text = ds
            p2.font.size = Pt(11)
            p2.font.color.rgb = MUTED_TEXT
            p2.space_after = Pt(6)

    # Right Image
    img_averif = os.path.join(SCREENSHOT_DIR, "08_verifikasi_admin.png")
    if os.path.exists(img_averif):
        slide11.shapes.add_picture(img_averif, Inches(5.3), Inches(1.5), width=Inches(7.2))

    # ==========================================
    # SLIDE 12: ADMIN - KELOLA & MODAL PROSES
    # ==========================================
    slide12 = prs.slides.add_slide(blank_layout)
    add_background(slide12, LIGHT_GREEN_BG)
    add_header_decorations(slide12, "PANDUAN ADMIN — LANGKAH 3")

    tx = slide12.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "3. Kelola Database Laporan & Modal Dialog"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # Image Left: Kelola Laporan Table
    img_akelola = os.path.join(SCREENSHOT_DIR, "09_kelola_laporan_admin.png")
    if os.path.exists(img_akelola):
        slide12.shapes.add_picture(img_akelola, Inches(0.8), Inches(1.5), width=Inches(6.0))

    # Image Right: Modal Proses
    img_amodal = os.path.join(SCREENSHOT_DIR, "10_modal_proses_admin.png")
    if os.path.exists(img_amodal):
        slide12.shapes.add_picture(img_amodal, Inches(7.0), Inches(1.5), width=Inches(5.5))

    # Bottom Explanation Box
    add_card(slide12, Inches(0.8), Inches(5.3), Inches(11.7), Inches(1.6), bg_color=WHITE)
    tx_bot = slide12.shapes.add_textbox(Inches(1.0), Inches(5.4), Inches(11.3), Inches(1.4))
    tf = tx_bot.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "Fitur Manajemen & Pop-up Modal Admin:"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    p2 = tf.add_paragraph()
    p2.text = "• Filter Status: Admin dapat menyaring laporan berdasarkan kategori (Semua, Pending, Diverifikasi, Dijual, Ditukar).\n• Modal Detail Laporan: Saat menekan tombol 'Proses', muncul pop-up dialog yang menampilkan rincian nasabah, foto resolusi tinggi, catatan khusus, dan opsi eksekusi status."
    p2.font.size = Pt(11)
    p2.font.color.rgb = MUTED_TEXT

    # ==========================================
    # SLIDE 13: ADMIN - PENJELASAN DETAIL TOMBOL & ELEMEN UI
    # ==========================================
    slide13 = prs.slides.add_slide(blank_layout)
    add_background(slide13, LIGHT_GREEN_BG)
    add_header_decorations(slide13, "PANDUAN ADMIN — DETAIL TOMBOL & UI")

    tx = slide13.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "Panduan Detail Tombol & Elemen UI (Admin)"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # 4 Cards in 2x2 Grid
    buttons_admin = [
        ("🛡️ Banner 'Panel Admin'", "Lokasi: Bagian Bawah Dashboard\nFungsi: Navigasi cepat khusus role admin ke fitur Verifikasi & Kelola Database Laporan."),
        ("✅ Tombol 'Verifikasi Laporan'", "Lokasi: Panel Admin & Sub-Navbar\nFungsi: Mengakses daftar antrean laporan penyetoran sampah yang berstatus Pending."),
        ("📋 Tombol 'Kelola Laporan'", "Lokasi: Panel Admin & Sub-Navbar\nFungsi: Mengakses database penuh seluruh laporan dari nasabah se-Jakarta."),
        ("✅ Tombol Aksi 'Verifikasi'", "Lokasi: Tabel Verifikasi & Modal\nFungsi: Menyetujui keabsahan laporan sampah tanpa mengubah ke transaksi penjualan/poin."),
        ("💰 Tombol Aksi 'Jual'", "Lokasi: Tabel Verifikasi & Modal\nFungsi: Memproses status laporan sampah menjadi 'Dijual' ke pihak pengepul/daur ulang."),
        ("🔄 Tombol Aksi 'Tukar'", "Lokasi: Tabel Verifikasi & Modal\nFungsi: Memproses status menjadi 'Ditukar' dan mengonversi berat ke poin nasabah."),
        ("🔍 Tombol Filter Status", "Lokasi: Halaman Kelola Laporan\nFungsi: Menyaring baris tabel berdasarkan status (Semua, Pending, Diverifikasi, Dijual, Ditukar)."),
        ("⚡ Tombol 'Proses' / Modal", "Lokasi: Kolom Aksi Kelola Laporan\nFungsi: Membuka dialog pop-up modal detail laporan untuk peninjauan foto & ubah status.")
    ]

    for idx, (b_title, b_desc) in enumerate(buttons_admin):
        col = idx % 2
        row = idx // 2
        left = Inches(0.8 + col * 5.9)
        top = Inches(1.5 + row * 1.35)
        
        add_card(slide13, left, top, Inches(5.7), Inches(1.25))
        tx_b = slide13.shapes.add_textbox(left + Inches(0.15), top + Inches(0.1), Inches(5.4), Inches(1.05))
        tf = tx_b.text_frame
        tf.word_wrap = True
        
        p = tf.paragraphs[0]
        p.text = b_title
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = MID_EMERALD
        
        p2 = tf.add_paragraph()
        p2.text = b_desc
        p2.font.size = Pt(10.5)
        p2.font.color.rgb = DARK_TEXT

    # ==========================================
    # SLIDE 14: KREDENSIAL TESTING & TABEL PERBANDINGAN ROLE
    # ==========================================
    slide14 = prs.slides.add_slide(blank_layout)
    add_background(slide14, LIGHT_GREEN_BG)
    add_header_decorations(slide14, "INFORMASI PENGUJIAN & CREDENTIALS")

    tx = slide14.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.733), Inches(0.6))
    p = tx.text_frame.paragraphs[0]
    p.text = "Kredensial Akun Pengujian (Testing) & Hak Akses"
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD

    # Card Left: Kredensial Testing
    add_card(slide14, Inches(0.8), Inches(1.5), Inches(5.6), Inches(5.2))
    tx_k = slide14.shapes.add_textbox(Inches(1.0), Inches(1.7), Inches(5.2), Inches(4.8))
    tf = tx_k.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "🔑 Akun Testing Siap Pakai:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD
    p.space_after = Pt(12)

    creds = [
        ("👤 Akun Nasabah (Masyarakat)", "Email: budi@email.com\nPassword: nasabah123\nAkses: Dashboard Nasabah, Setor Sampah, Tukar Poin Hadiah, Riwayat Transaksi."),
        ("🛡️ Akun Admin (Pengelola)", "Email: admin@sampahku.com\nPassword: admin123\nAkses: Panel Admin, Verifikasi Laporan, Kelola Database Laporan, Action Buttons."),
        ("⚙️ Keterangan Tambahan", "Password disimpan secara aman dalam format terenkripsi bcryptjs di PostgreSQL database.")
    ]
    for c_title, c_desc in creds:
        p = tf.add_paragraph()
        p.text = c_title
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = ACCENT_GREEN

        p2 = tf.add_paragraph()
        p2.text = c_desc
        p2.font.size = Pt(11)
        p2.font.color.rgb = DARK_TEXT
        p2.space_after = Pt(10)

    # Card Right: Matriks Fitur 2 Roles
    add_card(slide14, Inches(6.9), Inches(1.5), Inches(5.6), Inches(5.2))
    tx_m = slide14.shapes.add_textbox(Inches(7.1), Inches(1.7), Inches(5.2), Inches(4.8))
    tf = tx_m.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "📊 Matriks Ringkasan Fitur Per Role:"
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = MID_EMERALD
    p.space_after = Pt(12)

    matrix = [
        ("Registrasi Akun Baru", "Nasabah: YES | Admin: NO (By System)"),
        ("Menyetor / Melaporkan Sampah", "Nasabah: YES | Admin: NO"),
        ("Menukarkan Poin Ke Hadiah", "Nasabah: YES | Admin: NO"),
        ("Melihat Poin & Riwayat Sendiri", "Nasabah: YES | Admin: YES"),
        ("Akses Halaman Verifikasi Admin", "Nasabah: NO  | Admin: YES"),
        ("Ubah Status Laporan (Jual/Tukar)", "Nasabah: NO  | Admin: YES"),
        ("Filter & Search Seluruh Laporan", "Nasabah: NO  | Admin: YES")
    ]
    for m_fitur, m_akses in matrix:
        p = tf.add_paragraph()
        p.text = f"• {m_fitur}"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = DARK_TEXT

        p2 = tf.add_paragraph()
        p2.text = f"  {m_akses}"
        p2.font.size = Pt(11)
        p2.font.color.rgb = MUTED_TEXT
        p2.space_after = Pt(6)

    # ==========================================
    # SLIDE 15: CLOSING SLIDE
    # ==========================================
    slide15 = prs.slides.add_slide(blank_layout)
    add_background(slide15, DARK_EMERALD)

    # Top-Left & Bottom-Right Stars
    star1 = slide15.shapes.add_textbox(0.8, 0.8, 0.4, 0.4)
    star1 = slide15.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(0.4), Inches(0.4))
    star1.text_frame.text = "✦"
    star1.text_frame.paragraphs[0].font.size = Pt(20)
    star1.text_frame.paragraphs[0].font.color.rgb = WHITE

    star2 = slide15.shapes.add_textbox(Inches(12.1), Inches(6.3), Inches(0.4), Inches(0.4))
    star2.text_frame.text = "✦"
    star2.text_frame.paragraphs[0].font.size = Pt(20)
    star2.text_frame.paragraphs[0].font.color.rgb = WHITE

    tx = slide15.shapes.add_textbox(Inches(1.5), Inches(2.2), Inches(10.333), Inches(3.5))
    tf = tx.text_frame
    tf.word_wrap = True

    p0 = tf.paragraphs[0]
    p0.text = "TERIMA KASIH"
    p0.font.size = Pt(48)
    p0.font.bold = True
    p0.font.color.rgb = WHITE
    p0.alignment = PP_ALIGN.CENTER
    p0.space_after = Pt(14)

    p1 = tf.add_paragraph()
    p1.text = "✦ Mari Bersama Mewujudkan Jakarta Clean & Green ✦"
    p1.font.size = Pt(22)
    p1.font.bold = True
    p1.font.color.rgb = MINT_ACCENT
    p1.alignment = PP_ALIGN.CENTER
    p1.space_after = Pt(20)

    p2 = tf.add_paragraph()
    p2.text = "Platform SampahKu — Kelola Sampah Jadi Berkah\nDokumen User Manual ini telah disimpan di folder web project:\nUser_Manual_SampahKu.pptx & USER_MANUAL.md"
    p2.font.size = Pt(14)
    p2.font.color.rgb = WHITE
    p2.alignment = PP_ALIGN.CENTER

    prs.save(OUTPUT_PPTX)
    print("Presentation saved successfully at:", OUTPUT_PPTX)

if __name__ == "__main__":
    create_presentation()
