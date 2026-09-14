# `writeMany` Benchmark

A comparison of four approaches to writing one million records to `./test.txt`.

Measurements were collected on Windows with Node.js `v22.21.0`.

## Results

| Implementation                                 | Execution time | Avg. CPU[^1] | Peak memory[^2] |
| ---------------------------------------------- | -------------: | -----------: | --------------: |
| [writeManyAsync.js](./writeManyAsync.js)       |        100.2 s |       117.9% |         71.0 MB |
| [writeManyCallback.js](./writeManyCallback.js) |         16.3 s |       236.2% |      1,065.4 MB |
| [writeManyStream.js](./writeManyStream.js)     |         11.7 s |        88.0% |         64.8 MB |
| [writeManySync.js](./writeManySync.js)         |         15.0 s |        89.4% |         52.3 MB |

### Observations

- **Async:** Slowest because each write is awaited before the next begins.
- **Callback:** Fast, but uses significantly more memory because one million asynchronous writes are started without waiting for completion.
- **Stream:** Maintains high throughput while controlling memory usage through backpressure.
- **Sync:** Low memory usage, but synchronous writes block the event loop.

[^1]: CPU usage is measured relative to a single logical CPU core, so values can exceed `100%`. For example, `236.2%` corresponds to approximately `2.36` logical CPU cores on average.

[^2]: Memory usage is the peak Windows working set observed during execution.
