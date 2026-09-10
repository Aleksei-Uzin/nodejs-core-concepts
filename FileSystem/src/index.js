import { open } from 'node:fs/promises';

import commandHandler from './commandHandler.js';
import commandWatcher from './commandWatcher.js';

const COMMAND_FILE_PATH = './command.txt';
const commandFileHandler = await open(COMMAND_FILE_PATH, 'r');

commandFileHandler.on('change', async () => {
  await commandHandler(commandFileHandler);
});

await commandWatcher(commandFileHandler, COMMAND_FILE_PATH);
