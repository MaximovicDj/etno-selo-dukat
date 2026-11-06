import { readdir, readFile, writeFile, mkdir, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

const root = 'public/images';
const output = `${root}/optimized`;
await mkdir(output, { recursive: true });
const manifest = {};
let before = 0;
let after = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'optimized') await walk(file);
      continue;
    }
    if (!/\.(png|jpe?g|webp)$/i.test(entry.name)) continue;
    const input = await readFile(file);
    const metadata = await sharp(input).metadata();
    const width = metadata.autoOrient?.width || metadata.width;
    const height = metadata.autoOrient?.height || metadata.height;
    const logo = entry.name.startsWith('dukat-logo');
    // Text/line art and transparent decorations use lossless WebP. No sharpening,
    // cropping, upscaling or arbitrary full-size resolution cap is applied.
    const lossless = logo || metadata.hasAlpha || /^(menu-|celebration-offer|wednesday-poster)/.test(entry.name);
    const detailedPhoto = /^(magaza-|stay-gallery-|stay-hero-|celebration-gallery-1-clarity-v2)/.test(entry.name);
    const quality = detailedPhoto ? 94 : 90;
    const preserveOriginal = /\.(jpe?g|webp)$/i.test(entry.name);
    const maxWidth = width;
    const widths = [...new Set((logo ? [80, 160, 240, maxWidth] : [160, 320, 480, 640, 768, 960, 1280, 1536, maxWidth]).filter(w => w <= maxWidth))].sort((a,b) => a-b);
    const settings = { version: 2, quality, lossless, effort: 6, smartSubsample: true, alphaQuality: 100 };
    const hash = createHash('sha256').update(input).update(JSON.stringify(settings)).digest('hex').slice(0, 10);
    const stem = path.basename(file, path.extname(file));
    const variants = [];
    const source = file.replaceAll('\\', '/').replace(/^public\//, '');
    for (const size of widths) {
      // Do not re-encode an already compressed JPEG/WebP at its native size.
      if (size === width && preserveOriginal) {
        // Give the unchanged bytes a versioned URL too, so hosting can cache
        // every optimized image immutably without making originals stale.
        const nativeName = `${stem}-${hash}-${width}${path.extname(file).toLowerCase()}`;
        const destination = path.join(output, nativeName);
        try { await stat(destination); } catch { await writeFile(destination, input); }
        variants.push({ width, height, src: `images/optimized/${nativeName}`, encoding: 'original' });
        continue;
      }
      const name = `${stem}-${hash}-${size}.webp`;
      const destination = path.join(output, name);
      try { await stat(destination); } catch {
        await sharp(input).rotate().resize({ width: size, withoutEnlargement: true })
          .webp({ quality, lossless, effort: 6, smartSubsample: true, alphaQuality: 100 }).toFile(destination);
      }
      variants.push({ width: size, height: Math.round(height * size / width), src: `images/optimized/${name}`, encoding: lossless ? 'lossless' : `q${quality}` });
    }
    manifest[source] = variants;
    before += input.length;
    after += (await stat(`public/${variants.at(-1).src}`)).size;
  }
}
await walk(root);
await writeFile('src/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
if (process.argv.includes('--prune')) {
  const absoluteOutput = path.resolve(output);
  const workspaceImages = path.resolve(root) + path.sep;
  if (!absoluteOutput.startsWith(workspaceImages)) throw new Error('Generated output is outside public/images');
  const referenced = new Set(Object.values(manifest).flat().map(image => path.resolve('public', image.src)));
  for (const entry of await readdir(absoluteOutput, { withFileTypes: true })) {
    const target = path.resolve(absoluteOutput, entry.name);
    if (entry.isFile() && /^[a-z0-9-]+-[a-f0-9]{10}-\d+\.(webp|jpe?g)$/i.test(entry.name) && !referenced.has(target)) await unlink(target);
  }
}
console.log(JSON.stringify({ images: Object.keys(manifest).length, originalBytes: before, optimizedFullSizeBytes: after, reduction: `${(100 * (1 - after / before)).toFixed(1)}%` }, null, 2));
