import { close, open, write } from 'node:fs';

/**
 * Execution Time: 16.3s
 * CPU Usage: 236.2% average
 * Memory Usage: 1,065.4MB peak working set
 */
open('./test.txt', 'w', (err, fd) => {
  console.time('writeMany - callback');

  const n = 1e6;
  let completed = 0;

  for (let i = 0; i < n; i++) {
    write(fd, `${i}\n`, () => {
      if ((completed += 1) === n) {
        console.timeEnd('writeMany - callback');
        close(fd);
      }
    });
  }
});
