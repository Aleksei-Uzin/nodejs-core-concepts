import EventEmitter from '../EventEmitter';

describe('Async event sequencing', () => {
  class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
      this.emit('begin');

      asyncFunc(...args, (err, data) => {
        if (err) {
          return this.emit('error', err);
        }

        this.emit('data', data);
        this.emit('end');
      });
    }
  }

  let withTime;

  beforeEach(() => {
    withTime = new WithTime();
  });

  test('Emits in correct order for successful async operation', async () => {
    const events = [];
    withTime.on('begin', () => events.push('begin'));
    withTime.on('data', d => events.push(`data: ${d}`));
    withTime.on('end', () => events.push('end'));

    const fakeAsync = (value, cb) => setTimeout(() => cb(null, value), 1);

    await new Promise(resolve => {
      withTime.on('end', resolve);
      withTime.execute(fakeAsync, 'Aleksei');
    });

    expect(events).toEqual(['begin', 'data: Aleksei', 'end']);
  });

  test('Emits error when async function fails', async () => {
    const error = new Error('rejected');

    const caughtError = await new Promise(resolve => {
      withTime.on('error', resolve);
      withTime.execute((_, cb) => cb(error), 'ignored');
    });

    expect(caughtError).toBe(error);
  });
});
