# `readMany` Stream Processing

A Node.js example demonstrating file generation and stream-based processing with backpressure handling.

## How to Run

From the project root:

```bash
cd Stream/readMany
```

Run the entry point to generate and process a source file:

```bash
node index.js
```

The default source file size is **20 MB**. To specify a custom size in megabytes:

```bash
node index.js --size=150
```

## Notes

- `readMany.js` uses manual `pause()`/`resume()` flow control rather than `pipe()` to allow per-line transformation logic between the read and write streams.
