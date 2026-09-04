const BYTES_PER_LINE = 16;
const HEX_COLUMN_WIDTH = BYTES_PER_LINE * 3 - 1;

export function toHexDump(buffer) {
  const lines = [];

  for (let offset = 0; offset < buffer.length; offset += BYTES_PER_LINE) {
    const chunk = buffer.subarray(offset, offset + BYTES_PER_LINE);

    const hex = Array.from(chunk, byte => byte.toString(16).padStart(2, '0')).join(' ');

    const ascii = Array.from(chunk, byte =>
      byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.',
    ).join('');

    lines.push(
      `${offset.toString(16).padStart(8, '0')}  ${hex.padEnd(HEX_COLUMN_WIDTH)}  |${ascii}|`,
    );
  }

  return lines.join('\n');
}
