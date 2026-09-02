# Timer

A countdown timer built with Node.js `EventEmitter`.

## Events

- `tick` - emitted every second with the remaining seconds.
- `done` - emitted when the countdown completes.
- `paused` - emitted when the timer is paused.
- `resumed` - emitted when the timer is resumed.

## API

- `start()` - start the countdown.
- `pause()` - pause the countdown.
- `resume()` - resume the countdown.

`start()`, `pause()`, and `resume()` return the timer instance, allowing method chaining.

## Implementation

- [Timer.js](./Timer.js)

## How to Run

From the project root:

```bash
cd Events/Timer
node index.js [duration] [pauseAfter] [resumeAfter]
```

- `duration` - countdown length in seconds. Default: `5`.
- `pauseAfter` - number of seconds before the timer pauses. Default: `3`.
- `resumeAfter` - number of seconds before the timer resumes. Default: `5`.

For example, start a 10-second timer, pause it after 4 seconds, and resume it after 7 seconds:

```bash
node index.js 10 4 7
```
