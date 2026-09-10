import { watch } from 'node:fs/promises';

async function commandWatcher(fileHandle, path) {
  const watcher = watch(path);

  for await (const event of watcher) {
    if (event.eventType === 'change') {
      fileHandle.emit('change');
    }
  }
}

export default commandWatcher;
