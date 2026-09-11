import { Buffer } from 'node:buffer';
import { closeSync, openSync, writeSync } from 'node:fs';

/**
 * Execution Time: 15.0s
 * CPU Usage: 89.4% average
 * Memory Usage: 52.3MB peak working set
 */
const fd = openSync('./test.txt', 'w');

console.time('writeMany - sync');

for (let i = 0; i < 1e6; i++) {
  const buff = Buffer.from(`${i}\n`, 'utf-8');
  writeSync(fd, buff);
}

closeSync(fd);

console.timeEnd('writeMany - sync');
