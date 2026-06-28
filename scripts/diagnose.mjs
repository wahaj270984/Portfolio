import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

mkdirSync('tmp-shots', { recursive: true })
const URL = process.env.URL || 'http://localhost:5173/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('console', (m) => console.log('  [console]', m.type(), m.text()))
page.on('pageerror', (e) => console.log('  [pageerror]', e.message))

await page.goto(URL, { waitUntil: 'networkidle' })
// Wait out the fake preloader.
await page.waitForFunction(() => {
  const t = document.body.innerText || ''
  return !/\b\d{1,3}%/.test(t.slice(0, 200))
}, { timeout: 15000 }).catch(() => console.log('  (preloader wait timed out)'))
await page.waitForTimeout(2500)

const snap = async (label) => {
  const info = await page.evaluate(() => {
    const html = document.documentElement
    const canvases = [...document.querySelectorAll('canvas')].map((c) => ({
      cls: c.className,
      w: c.width,
      h: c.height,
      offW: c.offsetWidth,
      offH: c.offsetHeight,
      rect: (() => { const r = c.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } })(),
    }))
    return {
      dataTheme: html.dataset.theme,
      colorScheme: html.style.colorScheme,
      lsTheme: localStorage.getItem('theme'),
      bodyBg: getComputedStyle(document.body).backgroundColor,
      primary: getComputedStyle(html).getPropertyValue('--primary').trim(),
      canvases,
    }
  })
  console.log(`\n=== ${label} ===`)
  console.log(JSON.stringify(info, null, 2))
  await page.screenshot({ path: `tmp-shots/${label}.png` })
}

await snap('01-hero-dark')

// Scroll down to the Projects section to expose the fixed neural canvas bug.
await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView())
await page.waitForTimeout(1200)
await page.screenshot({ path: 'tmp-shots/01b-scrolled-dark.png' })

// Find and click the theme toggle (aria-label starts with "Theme:")
const toggle = page.locator('button[aria-label^="Theme:"]')
const count = await toggle.count()
console.log('\ntheme toggle buttons found:', count)
if (count) {
  for (let i = 0; i < 3; i++) {
    await toggle.first().click()
    await page.waitForTimeout(600)
    const label = await toggle.first().getAttribute('aria-label')
    await snap(`02-toggle-${i}-${(label || '').replace(/[^a-zA-Z]/g, '').slice(0, 12)}`)
  }
}

await browser.close()
console.log('\ndone -> tmp-shots/')
