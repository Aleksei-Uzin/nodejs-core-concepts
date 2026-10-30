import { FileWriteStream } from './customWritable.js';

(async () => {
  console.time('writeMany');

  const stream = new FileWriteStream({
    fileName: 'text.txt',
  });

  const numberOfWrites = 1e5;
  let i = 0;
  let d = 0;

  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(`${i}\n`, 'utf-8');

      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      i++;

      if (!stream.write(buff)) break;
    }
  };

  stream.on('drain', () => {
    d += 1;
    writeMany();
  });

  stream.on('finish', () => {
    console.log('Number of drains:', d);
    console.timeEnd('writeMany');
  });

  stream.on('error', error => {
    console.error('Failed to write file:', error);
    console.timeEnd('writeMany');
    process.exitCode = 1;
  });

  writeMany();
})();
