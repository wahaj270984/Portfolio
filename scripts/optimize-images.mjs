import sharp from 'sharp'
import { readdirSync, statSync, renameSync } from 'node:fs'

// Downscale + re-encode project cover images so they load fast. Schematics and
// the GUI screenshot are line/flat art, so a palette PNG compresses very well.
const dir = 'public/projects'
const files = readdirSync(dir).filter((f) => /\.png$/i.test(f))

for (const f of files) {
  const src = `${dir}/${f}`
  const tmp = `${src}.tmp`
  const before = statSync(src).size
  await sharp(src)
    .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, effort: 10, palette: true })
    .toFile(tmp)
  const after = statSync(tmp).size
  renameSync(tmp, src)
  console.log(`${f}: ${(before / 1024) | 0}KB -> ${(after / 1024) | 0}KB`)
}
