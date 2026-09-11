import { Buffer } from 'node:buffer';
import { open } from 'node:fs/promises';
import { once } from 'node:events';

/**
 * Execution Time: 11.7s
 * CPU Usage: 88.0% average
 * Memory Usage: 64.8MB peak working set
 */
(async () => {
  const fileHandle = await open('./test.txt', 'w');
  const stream = fileHandle.createWriteStream();

  console.time('writeMany - stream');

  for (let i = 0; i < 1e6; i++) {
    const buff = Buffer.from(`${i}\n`, 'utf-8');

    if (!stream.write(buff)) {
      await once(stream, 'drain');
    }
  }

  stream.end();
  await once(stream, 'finish');
  await fileHandle.close();

  console.timeEnd('writeMany - stream');
})();
