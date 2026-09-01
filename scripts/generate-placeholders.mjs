import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

const imagesDir = path.join(import.meta.dirname, '..', 'public', 'images')
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true })
}

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A])

function crc32(data) {
  let crc = 0xFFFFFFFF
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i]
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0)
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type)
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const crcData = Buffer.concat([typeBuffer, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(crcData))
  return Buffer.concat([length, typeBuffer, data, crc])
}

function createPng(filename, width, height, gray) {
  const rawData = Buffer.alloc(height * (1 + width))
  for (let y = 0; y < height; y++) {
    rawData[y * (1 + width)] = 0x00
    for (let x = 0; x < width; x++) {
      rawData[y * (1 + width) + 1 + x] = gray
    }
  }

  const deflated = zlib.deflateSync(rawData)

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8
  ihdr[9] = 0
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const png = Buffer.concat([
    PNG_SIGNATURE,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflated),
    chunk('IEND', Buffer.alloc(0))
  ])

  fs.writeFileSync(path.join(imagesDir, filename), png)
  console.log(`Created ${filename} (${png.length} bytes)`)
}

const images = [
  ['hero.png', 1600, 900, 210],
  ['house-01-hero.png', 1200, 800, 200],
  ['house-01-1.png', 1200, 800, 195],
  ['house-01-2.png', 1200, 800, 205],
  ['house-01-3.png', 1200, 800, 190],
  ['residence-04-hero.png', 1200, 800, 215],
  ['residence-04-1.png', 1200, 800, 200],
  ['residence-04-2.png', 1200, 800, 210],
  ['residence-04-3.png', 1200, 800, 195],
  ['concrete-house-hero.png', 1200, 800, 220],
  ['concrete-house-1.png', 1200, 800, 205],
  ['concrete-house-2.png', 1200, 800, 215],
  ['concrete-house-3.png', 1200, 800, 200],
  ['lagos-courtyard-hero.png', 1200, 800, 195],
  ['lagos-courtyard-1.png', 1200, 800, 185],
  ['lagos-courtyard-2.png', 1200, 800, 200],
  ['lagos-courtyard-3.png', 1200, 800, 190],
  ['studio-07-hero.png', 1200, 800, 210],
  ['studio-07-1.png', 1200, 800, 195],
  ['studio-07-2.png', 1200, 800, 205],
  ['studio-07-3.png', 1200, 800, 200],
  ['pavilion-09-hero.png', 1200, 800, 225],
  ['pavilion-09-1.png', 1200, 800, 210],
  ['pavilion-09-2.png', 1200, 800, 220],
  ['pavilion-09-3.png', 1200, 800, 205],
  ['form.png', 1200, 675, 200],
  ['material.png', 1200, 675, 195],
  ['space.png', 1200, 675, 210],
  ['light.png', 1200, 675, 215],
]

for (const [filename, width, height, gray] of images) {
  createPng(filename, width, height, gray)
}

console.log('Done.')
