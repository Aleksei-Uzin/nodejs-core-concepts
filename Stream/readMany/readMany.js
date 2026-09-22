import { open } from 'node:fs/promises';

async function readMany() {
  const fileHandleRead = await open('./source.txt', 'r');
  const fileHandleWrite = await open('./dest.txt', 'w');

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });

  const streamWrite = fileHandleWrite.createWriteStream();

  let part = '';

  streamRead.on('data', chunk => {
    const numbers = part.concat(chunk).split('\n');
    part = numbers.pop();

    for (const number of numbers) {
      const n = Number(number);

      if (n % 10 === 0 && !streamWrite.write(`${n}\n`)) {
        streamRead.pause();
      }
    }
  });

  streamWrite.on('drain', () => {
    streamRead.resume();
  });

  streamRead.on('end', () => {
    if (part) {
      const n = Number(part);

      if (n % 10 === 0) {
        streamWrite.write(`${n}\n`);
      }
    }

    streamWrite.end();
  });

  streamWrite.on('finish', async () => {
    await fileHandleRead.close();
    await fileHandleWrite.close();

    console.log('Done Reading');
  });
}

export default readMany;
