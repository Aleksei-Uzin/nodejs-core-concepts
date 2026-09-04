import { toHexDump } from './hexDump.js';

export function inspectBuffer(buffer) {
  if (!Buffer.isBuffer(buffer)) {
    throw new TypeError('Expected a Buffer');
  }

  const result = {
    size: buffer.length,
    hexDump: toHexDump(buffer),
  };

  if (buffer.length >= 4) {
    result.uint32LE = buffer.readUInt32LE(0);
    result.uint32BE = buffer.readUInt32BE(0);
  }

  return result;
}
