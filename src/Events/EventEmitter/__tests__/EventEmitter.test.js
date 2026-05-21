const EventEmitter = require('../EventEmitter');

describe('EventEmitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  describe('emitter.on / emitter.addListener', () => {
    test('Registers listeners that fire in registration order', () => {
      const events = [];
      const handler1 = () => events.push('handler1');
      const handler2 = () => events.push('handler2');

      emitter.on('event', handler1);
      emitter.addListener('event', handler2);
      emitter.emit('event');

      expect(events).toEqual(['handler1', 'handler2']);
    });

    test('Listeners receive emitted arguments', () => {
      const received = [];

      emitter.on('event', (a, b) => received.push(a, b));
      emitter.emit('event', 1, 'two');

      expect(received).toEqual([1, 'two']);
    });
  });

  describe('emitter.once', () => {
    test('Fires listener only once even when emitted multiple times', () => {
      const handler = jest.fn();

      emitter.once('single', handler);

      emitter.emit('single');
      emitter.emit('single');
      emitter.emit('single');

      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('Passes arguments to once listener', () => {
      const received = [];

      emitter.once('event', value => received.push(value));

      emitter.emit('event', 'first');
      emitter.emit('event', 'second');

      expect(received).toEqual(['first']);
    });
  });

  describe('emitter.off / emitter.removeListener', () => {
    test('Removes specific listener', () => {
      const events = [];
      const handler1 = () => events.push('handler1');
      const handler2 = () => events.push('handler2');

      emitter.on('event', handler1);
      emitter.on('event', handler2);
      emitter.off('event', handler1);

      emitter.emit('event');

      expect(events).toEqual(['handler2']);
    });
  });

  describe('emit', () => {
    test('Returns true when event has listeners', () => {
      emitter.on('event', () => {});
      expect(emitter.emit('event')).toBe(true);
    });

    test('Returns false when event has no listeners', () => {
      expect(emitter.emit('nonexistent')).toBe(false);
    });

    test('Handles multiple events independently', () => {
      const events = [];
      emitter.on('eventA', () => events.push('a'));
      emitter.on('eventB', () => events.push('b'));

      emitter.emit('eventA');
      emitter.emit('eventB');

      expect(events).toEqual(['a', 'b']);
    });
  });

  describe('listenerCount', () => {
    test('Returns correct count for event with listeners', () => {
      emitter.on('event', () => {});
      emitter.on('event', () => {});

      expect(emitter.listenerCount('event')).toBe(2);
    });
  });

  describe('rawListeners', () => {
    test('Returns actual listener functions', () => {
      const handler = () => {};

      emitter.on('test', handler);

      const raw = emitter.rawListeners('test');

      expect(raw).toHaveLength(1);
      expect(raw[0]).toBe(handler);
    });
  });
});
