import { inspectBuffer } from '../src/inspectBuffer.js';

describe('Binary File Inspector', () => {
  describe('Buffer validation', () => {
    it('Should accept a Buffer', () => {
      expect(() => inspectBuffer(Buffer.from([1, 2, 3]))).not.toThrow();
    });

    it('Should reject non-Buffer values', () => {
      expect(() => inspectBuffer([1, 2, 3])).toThrow(TypeError);
    });
  });

  describe('Buffer information', () => {
    it('Inspects Buffer information', () => {
      const buffer = Buffer.from('Buffer');

      expect(inspectBuffer(buffer)).toEqual({
        hexDump: '00000000  42 75 66 66 65 72                                |Buffer|',
        size: 6,
        uint32BE: 1114990182,
        uint32LE: 1717990722,
      });
    });

    it('Should not read 32-bit integers from an insufficient buffer', () => {
      const buffer = Buffer.from([0x48, 0x69, 0x21]);

      expect(inspectBuffer(buffer)).toEqual({
        hexDump: '00000000  48 69 21                                         |Hi!|',
        size: 3,
      });
    });
  });

  describe('Integer interpretation', () => {
    it('reads a 32-bit integer using different byte orders', () => {
      const buffer = Buffer.from([0x78, 0x56, 0x34, 0x12]);

      expect(inspectBuffer(buffer).uint32BE).toBe(0x78563412);
      expect(inspectBuffer(buffer).uint32LE).toBe(0x12345678);
    });
  });
});
