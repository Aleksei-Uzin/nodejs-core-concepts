import generateSourceFile from '../utilities/generateSourceFile.js';
import getSizeInMegabytes from '../utilities/getSizeInMegabytes.js';
import readMany from './readMany.js';

(async () => {
  const sizeMB = getSizeInMegabytes();

  await generateSourceFile(sizeMB);
  await readMany();
})();
