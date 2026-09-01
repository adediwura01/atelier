const fs = require('fs')
const path = require('path')

const imagesDir = path.join(__dirname, '..', 'public', 'images')
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

function createPlaceholderJpeg(filename, width, height, r, g, b) {
  const buffer = Buffer.alloc(width * height * 3)
  for (let i = 0; i < width * height; i++) {
    buffer[i * 3] = r
    buffer[i * 3 + 1] = g
    buffer[i * 3 + 2] = b
  }

  const jpeg = buildMinimalJpeg(width, height, buffer)
  fs.writeFileSync(path.join(imagesDir, filename), jpeg)
  console.log(`Created ${filename}`)
}

function buildMinimalJpeg(width, height, rawData) {
  function writeMarker(marker) {
    out.push(0xFF, marker)
  }

  function writeLength(len) {
    out.push((len >> 8) & 0xFF, len & 0xFF)
  }

  function writeBytes(...bytes) {
    bytes.forEach(b => out.push(b & 0xFF))
  }

  const out = []

  writeMarker(0xD8)

  writeMarker(0xE0)
  writeLength(16)
  writeBytes(...Buffer.from('JFIF'))
  writeBytes(0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00)

  writeMarker(0xDB)
  writeLength(67 + 2)
  for (let i = 0; i < 64; i++) {
    const val = i === 0 ? 0x80 : 0x80
    out.push(val & 0xFF)
  }
  for (let i = 0; i < 64; i++) {
    const val = i === 0 ? 0x80 : 0x80
    out.push(val & 0xFF)
  }

  writeMarker(0xC0)
  writeLength(17)
  writeBytes(0x08)
  writeLength(height)
  writeLength(width)
  writeBytes(0x03, 0x01, 0x22, 0x00, 0x02, 0x11, 0x01, 0x03, 0x11, 0x01)

  writeMarker(0xC4)
  writeLength(31 + 2)
  writeBytes(0x00)
  for (let i = 0; i < 16; i++) {
    out.push(i < 1 ? 1 : 0)
  }
  out.push(0x00)

  writeMarker(0xDA)
  writeLength(12 + 2)
  writeBytes(0x03, 0x01, 0x00, 0x02, 0x11, 0x03, 0x11, 0x00, 0x3F, 0x00)

  const mcuW = 8
  const mcuH = 8
  for (let y = 0; y < height; y += mcuH) {
    for (let x = 0; x < width; x += mcuW) {
      for (let my = 0; my < mcuH && (y + my) < height; my++) {
        for (let mx = 0; mx < mcuW && (x + mx) < width; mx++) {
          const px = x + mx
          const py = y + my
          const idx = (py * width + px) * 3
          const Y = Math.round(0.299 * rawData[idx] + 0.587 * rawData[idx + 1] + 0.114 * rawData[idx + 2])
          out.push(Y & 0xFF)
        }
      }
    }
  }

  writeMarker(0xD9)

  return Buffer.from(out)
}

const placeholders = [
  ['hero.jpg', 1600, 900, 210, 210, 205],
  ['house-01-hero.jpg', 1200, 800, 200, 200, 195],
  ['house-01-1.jpg', 1200, 800, 195, 195, 190],
  ['house-01-2.jpg', 1200, 800, 205, 205, 200],
  ['house-01-3.jpg', 1200, 800, 190, 190, 185],
  ['residence-04-hero.jpg', 1200, 800, 215, 215, 210],
  ['residence-04-1.jpg', 1200, 800, 200, 200, 195],
  ['residence-04-2.jpg', 1200, 800, 210, 210, 205],
  ['residence-04-3.jpg', 1200, 800, 195, 195, 190],
  ['concrete-house-hero.jpg', 1200, 800, 220, 220, 215],
  ['concrete-house-1.jpg', 1200, 800, 205, 205, 200],
  ['concrete-house-2.jpg', 1200, 800, 215, 215, 210],
  ['concrete-house-3.jpg', 1200, 800, 200, 200, 195],
  ['lagos-courtyard-hero.jpg', 1200, 800, 195, 195, 190],
  ['lagos-courtyard-1.jpg', 1200, 800, 185, 185, 180],
  ['lagos-courtyard-2.jpg', 1200, 800, 200, 200, 195],
  ['lagos-courtyard-3.jpg', 1200, 800, 190, 190, 185],
  ['studio-07-hero.jpg', 1200, 800, 210, 210, 205],
  ['studio-07-1.jpg', 1200, 800, 195, 195, 190],
  ['studio-07-2.jpg', 1200, 800, 205, 205, 200],
  ['studio-07-3.jpg', 1200, 800, 200, 200, 195],
  ['pavilion-09-hero.jpg', 1200, 800, 225, 225, 220],
  ['pavilion-09-1.jpg', 1200, 800, 210, 210, 205],
  ['pavilion-09-2.jpg', 1200, 800, 220, 220, 215],
  ['pavilion-09-3.jpg', 1200, 800, 205, 205, 200],
  ['form.jpg', 1200, 675, 200, 200, 195],
  ['material.jpg', 1200, 675, 195, 195, 190],
  ['space.jpg', 1200, 675, 210, 210, 205],
  ['light.jpg', 1200, 675, 215, 215, 210],
]

placeholders.forEach(([filename, width, height, r, g, b]) => {
  createPlaceholderJpeg(filename, width, height, r, g, b)
})

console.log('All placeholder images created successfully.')
