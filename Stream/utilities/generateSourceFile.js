import { Buffer } from 'node:buffer';
import { open } from 'node:fs/promises';
import { once } from 'node:events';

const FILE_NAME = './source.txt';

async function generateSourceFile(sizeMB) {
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

export default generateSourceFile;
