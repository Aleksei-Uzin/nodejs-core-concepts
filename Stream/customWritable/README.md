# Custom Writable Stream

A Node.js example of a custom `Writable` stream.

## How to Run

From the project root:

```bash
cd Stream/customWritable
node index.js
```

## Notes

- [customWritable.js](./customWritable.js) implements `FileWriteStream`. It opens the output file when the stream is constructed, batches incoming chunks, and writes each batch while handling partial file writes.
- The stream flushes any remaining data when it finishes and closes the file descriptor when destroyed.
- [index.js](./index.js) demonstrates backpressure handling: it stops writing when `write()` returns `false` and resumes after the `drain` event.
