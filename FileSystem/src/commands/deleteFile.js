import { unlink } from 'node:fs/promises';

async function deleteFile(path) {
  try {
    await unlink(path);
    console.log('The file was successfully removed.');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('No file at this path to remove.');
    } else {
      console.log('An error occurred while removing the file:');
      console.log(err);
    }
  }
}

export default deleteFile;
