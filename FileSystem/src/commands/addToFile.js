import { open } from 'node:fs/promises';

let addedContent = '';

async function addToFile(path, content) {
  if (addedContent === content) return;

  try {
    const fileHandle = await open(path, 'a');
    await fileHandle.write(content);
    await fileHandle.close();
    addedContent = content;
    console.log('The content was added successfully.');
  } catch (err) {
    console.log('An error occurred while writing to the file:');
    console.log(err);
  }
}

export default addToFile;
