# Node.js: Core Concepts

## Topics

### Events (EventEmitter)

<details>
<summary>Custom EventEmitter</summary>

- [Custom EventEmitter implementation](./src/Events/EventEmitter/EventEmitter.js)
- [freecodecamp: How to code your own event emitter in Node.js](https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/)

</details>

<details>
<summary>Timer</summary>

- [Timer implementation](./src/Events/Timer/Timer.js)
- Emits `tick` every second. Emits `done` after N seconds. Supports `pause()` and `resume()`.
- **How to run**

```bash
  node src\Events\Timer\index.js
```

</details>
