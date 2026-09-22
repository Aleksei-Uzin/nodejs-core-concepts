# `readMany` Stream Processing

A Node.js scripts demonstrating file generation and stream-based processing using backpressure handling.

## How to Run

From the project root:

```bash
cd Stream/readMany
```

### 1. Generate the source file

```bash
node generateSourceFile.js
```

[generateSourceFile.js](./generateSourceFile.js) generates a `source.txt` file with a default size of **20 MB**, containing sequential integers starting from `0`, each on its own line.

To specify a custom size in `megabytes`:

```bash
node generateSourceFile.js --size=150
```

### 2. Process the file

```bash
node readMany.js
```

[readMany.js](./readMany.js) reads the generated `source.txt` as a stream, filters every number divisible by 10, and writes the results to `dest.txt`.

## Notes

- `readMany.js` uses manual `pause()`/`resume()` flow control rather than `pipe()` to allow per-line transformation logic between the read and write streams.
