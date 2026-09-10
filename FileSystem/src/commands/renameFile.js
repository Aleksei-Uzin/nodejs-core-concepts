import { rename } from 'node:fs/promises';

async function renameFile(oldPath, newPath) {
  try {
    await rename(oldPath, newPath);
    console.log('The file was successfully renamed.');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No file at this path to rename.');
    } else {
      console.log('An error occurred while renaming the file:');
      console.log(err);
    }
  }
}

export default renameFile;
