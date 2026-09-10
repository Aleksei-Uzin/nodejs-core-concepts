import {
  CREATE_FILE,
  DELETE_FILE,
  RENAME_FILE,
  ADD_TO_FILE,
  RENAME_SEPARATOR,
  CONTENT_SEPARATOR,
} from './constants.js';

import createFile from './commands/createFile.js';
import deleteFile from './commands/deleteFile.js';
import renameFile from './commands/renameFile.js';
import addToFile from './commands/addToFile.js';

import readFile from './readFile.js';

async function commandHandler(fileHandle) {
  const command = await readFile(fileHandle);

  if (command.startsWith(CREATE_FILE)) {
    const filePath = command.slice(CREATE_FILE.length);
    await createFile(filePath.trim());
  }

  if (command.startsWith(DELETE_FILE)) {
    const filePath = command.slice(DELETE_FILE.length);
    await deleteFile(filePath.trim());
  }

  if (command.startsWith(RENAME_FILE)) {
    const ind = command.indexOf(RENAME_SEPARATOR);

    if (ind === -1) return;

    const oldFilePath = command.slice(RENAME_FILE.length, ind);
    const newFilePath = command.slice(ind + RENAME_SEPARATOR.length);
    await renameFile(oldFilePath.trim(), newFilePath.trim());
  }

  if (command.startsWith(ADD_TO_FILE)) {
    const ind = command.indexOf(CONTENT_SEPARATOR);

    if (ind === -1) return;

    const filePath = command.slice(ADD_TO_FILE.length, ind);
    const content = command.slice(ind + CONTENT_SEPARATOR.length);
    await addToFile(filePath.trim(), content);
  }
}

export default commandHandler;
