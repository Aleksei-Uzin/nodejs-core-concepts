import { toHexDump } from '../src/hexDump.js';

describe('toHexDump', () => {
  it('Formats bytes as hexadecimal with an ASCII representation', () => {
    const buffer = Buffer.from('Hello');

    expect(toHexDump(buffer)).toBe(
      '00000000  48 65 6c 6c 6f                                   |Hello|',
    );
  });

  it('Represents non-printable bytes with dots', () => {
    const buffer = Buffer.from([0x00, 0x01, 0x41, 0xff]);

    expect(toHexDump(buffer)).toBe(
      '00000000  00 01 41 ff                                      |..A.|',
    );
  });

  it('Creates a new line for every 16 bytes', () => {
    const buffer = Buffer.from(Array.from({ length: 17 }, (_, index) => index));
    const lines = toHexDump(buffer).split('\n');

    expect(lines).toHaveLength(2);
    expect(lines[0]).toMatch(/^00000000/);
    expect(lines[1]).toMatch(/^00000010/);
  });
});
