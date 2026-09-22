# `copyFile` Low-Level File Copy

A Node.js example demonstrating file copying using low-level file handle operations with a fixed-size buffer.

## How to Run

From the project root:

```bash
cd Stream/fileCopy
```

Run the entry point to generate a source file and copy it:

```bash
node index.js
```

The default source file size is **20 MB**. To specify a custom size in megabytes:

```bash
node index.js --size=150
```

## Notes

- `copyFile.js` uses a single pre-allocated 16 KB buffer and sequential `read`/`write` calls rather than streams, giving explicit control over chunk size and I/O ordering.
