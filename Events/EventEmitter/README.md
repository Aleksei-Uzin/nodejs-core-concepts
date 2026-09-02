# EventEmitter

A small, dependency-free implementation of the EventEmitter pattern.

## API

- `on(eventName, listener)` - register a listener. Alias: `addListener()`.

- `once(eventName, listener)` - register a listener that is removed after its first call.

- `off(eventName, listener)` - remove the first matching listener. Alias: `removeListener()`.

- `emit(eventName, ...args)` - call listeners in registration order. Returns `true` if listeners exist, otherwise `false`.

- `listenerCount(eventName)` - return the number of registered listeners.

- `rawListeners(eventName)` - return the stored listener array, or `undefined`.

## Implementation

- [EventEmitter](./EventEmitter.js)

## Tests

- [EventEmitter.test.js](./tests/EventEmitter.test.js)
- [EventEmitterAsyncEvents.test.js](./tests/EventEmitterAsyncEvents.test.js)

## Resource

[freecodecamp: How to code your own event emitter in Node.js](https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/)
