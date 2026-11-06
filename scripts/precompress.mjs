import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { brotliCompress, gzip, constants } from 'node:zlib';

const brotli = promisify(brotliCompress);
const gz = promisify(gzip);
let originalBytes = 0;
let brotliBytes = 0;
let gzipBytes = 0;
let files = 0;
async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    if (!/\.(html|css|js|svg|json|txt|xml)$/.test(entry.name)) continue;
    const input = await readFile(file);
    const [br, compressed] = await Promise.all([
      brotli(input, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }),
      gz(input, { level: 9 }),
    ]);
    await writeFile(`${file}.br`, br);
    await writeFile(`${file}.gz`, compressed);
    originalBytes += input.length;
    brotliBytes += br.length;
    gzipBytes += compressed.length;
    files++;
  }
}
await walk('dist');
console.log(JSON.stringify({ files, originalBytes, brotliBytes, gzipBytes,
  note: 'Hosting must negotiate Content-Encoding and Vary: Accept-Encoding. Do not link to .br/.gz files directly.' }, null, 2));
