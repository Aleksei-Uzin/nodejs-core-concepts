# Buffer

Binary File Inspector using Node.js `Buffer` values.

## API

- `toHexDump(buffer)` - formats a Buffer as 16-byte hexadecimal and ASCII rows.
- `inspectBuffer(buffer)` - returns the Buffer size, hex dump, and, when at least four bytes are available, `uint32LE` and `uint32BE` values. Requires a Node.js `Buffer` and throws a `TypeError` for other values.

## Implementation

- [toHexDump](./src/hexDump.js)
- [inspectBuffer](./src/inspectBuffer.js)
- [CLI inspector](./bin/inspect.js)

## How to Run

From the project root:

```bash
cd Buffer
node bin/inspect.js samples/sample.bin
```

### Demonstration: `sample.bin`

```text
File: samples/sample.bin
Size: 32 bytes

00000000  48 65 6c 6c 6f 20 57 6f 72 6c 64 00 00 00 00 00  |Hello World.....|
00000010  78 56 34 12 ff 00 01 02 10 20 30 40 50 60 70 80  |xV4...... 0@P`p.|

UInt32LE @ 0x00000000: 1819043144
UInt32BE @ 0x00000000: 1214606444
```

To inspect another file:

```bash
node bin/inspect.js samples/file.bin
```

## Tests

- [hexDump.test.js](./tests/hexDump.test.js)
- [inspectBuffer.test.js](./tests/inspectBuffer.test.js)
