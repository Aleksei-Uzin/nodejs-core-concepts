import { Buffer } from 'node:buffer';
import { open } from 'node:fs/promises';
import { once } from 'node:events';

const FILE_NAME = './source.txt';
const DEFAULT_SIZE_MB = 79;

function getSizeInMegabytes() {
  const arg = process.argv.find(arg => arg.startsWith('--size='));

  if (!arg) {
    return DEFAULT_SIZE_MB;
  }

  const size = Number(arg.split('=')[1]);

  if (!Number.isFinite(size) || size <= 0) {
    throw new Error('Size must be a positive number.');
  }

  return size;
}

async function generateSourceFile() {
  const sizeMB = getSizeInMegabytes();
  const targetSize = sizeMB * 1024 * 1024;

  const fileHandle = await open(FILE_NAME, 'w');
  const stream = fileHandle.createWriteStream();

  let size = 0;
  let n = 0;

  while (size < targetSize) {
    const buff = Buffer.from(`${n}\n`, 'utf-8');

    if (!stream.write(buff)) {
      await once(stream, 'drain');
    }

    size += buff.byteLength;
    n += 1;
  }

  stream.end();
  await once(stream, 'finish');
  await fileHandle.close();

  console.log(`Created ${FILE_NAME} ${(size / 1024 / 1024).toFixed(2)} MB`);
}

await generateSourceFile();
