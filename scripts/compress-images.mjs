import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { createWriteStream } from 'fs';
import { join, extname, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { promisify } from 'util';
import { pipeline } from 'stream';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const DIRS = [
  join(ROOT, 'content'),
  join(ROOT, 'public', 'content'),
];

async function walk(dir) {
  let files = [];
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); }
  catch { return files; }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files = files.concat(await walk(full));
    else files.push(full);
  }
  return files;
}

let totalBefore = 0, totalSaved = 0;

for (const dir of DIRS) {
  const files = await walk(dir);
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const before = (await stat(file)).size;
    const tmp = file + '.__tmp';
    let buf;

    try {
      if (ext === '.png') {
        buf = await sharp(file).png({ compressionLevel: 9 }).toBuffer();
      } else {
        buf = await sharp(file).jpeg({ quality: 78, mozjpeg: true }).toBuffer();
      }
    } catch (e) {
      console.warn(`  SKIP  ${relative(ROOT, file)}: ${e.message}`);
      continue;
    }

    if (buf.length >= before) {
      totalBefore += before;
      const label = relative(ROOT, file).padEnd(65);
      console.log(`  ${label} ${Math.round(before/1024)}KB  \x1b[90m(già ottimizzata)\x1b[0m`);
      continue;
    }

    // write buffer to tmp, then rename over original
    try {
      await new Promise((res, rej) => {
        const ws = createWriteStream(tmp);
        ws.on('finish', res);
        ws.on('error', rej);
        ws.end(buf);
      });
      await rename(tmp, file);
    } catch (e) {
      try { await unlink(tmp); } catch {}
      console.warn(`  SKIP  ${relative(ROOT, file)}: ${e.message}`);
      continue;
    }

    const saved = before - buf.length;
    totalSaved += saved;
    totalBefore += before;
    const pct = Math.round((saved / before) * 100);
    console.log(`  \x1b[32m✓\x1b[0m ${relative(ROOT, file).padEnd(64)} ${Math.round(before/1024)}KB → ${Math.round(buf.length/1024)}KB  \x1b[32m-${pct}%\x1b[0m`);
  }
}

console.log(`\n\x1b[1mRisparmio totale: ${Math.round(totalSaved/1024)} KB su ${Math.round(totalBefore/1024)} KB (${Math.round(totalSaved/totalBefore*100)}%)\x1b[0m`);
