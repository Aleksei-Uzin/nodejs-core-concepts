import { Buffer } from 'node:buffer';
import { open } from 'node:fs/promises';

async function copyFile() {
  let fileHandleRead;
  let fileHandleWrite;

  try {
    fileHandleRead = await open('./source.txt', 'r');
    fileHandleWrite = await open('./dest.txt', 'w');

    const buffer = Buffer.alloc(16 * 1024);
    let count = -1;

    while (count !== 0) {
      const { bytesRead } = await fileHandleRead.read(buffer);
      count = bytesRead;

      if (bytesRead > 0) {
        await fileHandleWrite.write(buffer.subarray(0, bytesRead));
      }
    }
  } finally {
    await fileHandleRead?.close();
    await fileHandleWrite?.close();
  }

  console.log('File copied successfully');
}

export default copyFile;
