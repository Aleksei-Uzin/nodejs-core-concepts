import generateSourceFile from '../utilities/generateSourceFile.js';
import getSizeInMegabytes from '../utilities/getSizeInMegabytes.js';
import copyFile from './copyFile.js';

(async () => {
  const sizeMB = getSizeInMegabytes();

  await generateSourceFile(sizeMB);
  await copyFile();
})();
