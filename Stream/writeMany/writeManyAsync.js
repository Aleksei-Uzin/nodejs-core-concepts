import { open } from 'node:fs/promises';

/**
 * Execution Time: 100.2s
 * CPU Usage: 117.9% average
 * Memory Usage: 71.0MB peak working set
 */
(async () => {
  const fileHandle = await open('./test.txt', 'w');

  console.time('writeMany - async');

  for (let i = 0; i < 1e6; i++) {
    await fileHandle.write(`${i}\n`);
  }

  console.timeEnd('writeMany - async');

  await fileHandle.close();
})();
