import { readFile } from 'node:fs/promises';
import { inspectBuffer } from '../src/inspectBuffer.js';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node bin/inspect.js <file>');
  process.exit(1);
}

try {
  const buffer = await readFile(filePath);
  const result = inspectBuffer(buffer);

  console.log(`File: ${filePath}`);
  console.log(`Size: ${result.size} bytes`);
  console.log();
  console.log(result.hexDump);

  if (result.uint32LE !== undefined) {
    console.log();
    console.log(`UInt32LE @ 0x00000000: ${result.uint32LE}`);
    console.log(`UInt32BE @ 0x00000000: ${result.uint32BE}`);
  }
} catch (error) {
  console.error(`Unable to inspect file: ${error.message}`);
  process.exit(1);
}
