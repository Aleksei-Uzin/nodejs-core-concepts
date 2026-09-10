import { open } from 'node:fs/promises';

async function createFile(path) {
  try {
    const fileHandle = await open(path, 'wx');
    await fileHandle.close();
    console.log('A new file was successfully created.');
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`The file ${path} already exists.`);
    } else {
      console.log('An error occurred while creating the file:');
      console.log(err);
    }
  }
}

export default createFile;
