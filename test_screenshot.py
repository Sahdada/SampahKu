import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        try:
            # try msedge first
            browser = await p.chromium.launch(channel="msedge", headless=True)
            print("Launched Edge successfully!")
        except Exception as e:
            print("Edge launch failed:", e)
            try:
                browser = await p.chromium.launch(channel="chrome", headless=True)
                print("Launched Chrome successfully!")
            except Exception as e2:
                print("Chrome launch failed:", e2)
                return
        
        page = await browser.new_page()
        await page.goto("http://localhost:3000")
        await page.screenshot(path="test_landing.png")
        print("Screenshot saved!")
        await browser.close()

asyncio.run(main())
