import asyncio
import json
from playwright.async_api import async_playwright
import os

SCREENSHOT_DIR = os.path.join(os.getcwd(), "manual_screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

async def capture():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        context = await browser.new_context(
            viewport={"width": 1440, "height": 900},
            device_scale_factor=2
        )
        page = await context.new_page()

        print("1. Capturing Landing Page...")
        await page.goto("http://localhost:3000", wait_until="networkidle")
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "01_landing.png"))

        print("2. Capturing Login Page...")
        await page.goto("http://localhost:3000/login", wait_until="networkidle")
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "02_login.png"))

        print("3. Capturing Register Page...")
        await page.goto("http://localhost:3000/register", wait_until="networkidle")
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "03_register.png"))

        # Perform API Login for Nasabah Budi
        print("Logging in as Nasabah (Budi)...")
        login_res = await page.request.post("http://localhost:3000/api/auth/login", data={
            "email": "budi@email.com",
            "password": "nasabah123"
        })
        nasabah_data = await login_res.json()
        print("Nasabah login result:", nasabah_data.get("success"))

        # Set localStorage for Nasabah
        await page.goto("http://localhost:3000")
        token_nasabah = nasabah_data.get("token")
        user_nasabah = json.dumps(nasabah_data.get("user"))

        await page.evaluate(f"""() => {{
            localStorage.setItem('token', '{token_nasabah}');
            localStorage.setItem('user', '{user_nasabah}');
        }}""")

        print("4. Capturing Dashboard Nasabah...")
        await page.goto("http://localhost:3000/dashboard", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "04_dashboard_nasabah.png"))

        print("5. Capturing Form Setor Sampah...")
        await page.goto("http://localhost:3000/laporan/tambah", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "05_lapor_sampah.png"))

        print("6. Capturing Halaman Tukar Poin...")
        await page.goto("http://localhost:3000/tukar-poin", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "06_tukar_poin.png"))

        # Perform API Login for Admin
        print("Logging in as Admin...")
        admin_login_res = await page.request.post("http://localhost:3000/api/auth/login", data={
            "email": "admin@sampahku.com",
            "password": "admin123"
        })
        admin_data = await admin_login_res.json()
        print("Admin login result:", admin_data.get("success"))

        token_admin = admin_data.get("token")
        user_admin = json.dumps(admin_data.get("user"))

        await page.goto("http://localhost:3000")
        await page.evaluate(f"""() => {{
            localStorage.setItem('token', '{token_admin}');
            localStorage.setItem('user', '{user_admin}');
        }}""")

        print("7. Capturing Dashboard Admin...")
        await page.goto("http://localhost:3000/dashboard", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "07_dashboard_admin.png"))

        print("8. Capturing Verifikasi Admin...")
        await page.goto("http://localhost:3000/admin/verifikasi", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "08_verifikasi_admin.png"))

        print("9. Capturing Kelola Laporan Admin...")
        await page.goto("http://localhost:3000/admin/laporan", wait_until="networkidle")
        await asyncio.sleep(1)
        await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "09_kelola_laporan_admin.png"))

        # Try opening modal on admin laporan page if there's a button
        print("10. Capturing Modal Proses Admin...")
        try:
            proses_btn = page.locator("button:has-text('Proses')").first
            if await proses_btn.is_visible():
                await proses_btn.click()
                await asyncio.sleep(0.5)
                await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "10_modal_proses_admin.png"))
            else:
                await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "10_modal_proses_admin.png"))
        except Exception as e:
            print("Modal screenshot note:", e)
            await page.screenshot(path=os.path.join(SCREENSHOT_DIR, "10_modal_proses_admin.png"))

        await browser.close()
        print("✅ All screenshots captured successfully!")

asyncio.run(capture())
