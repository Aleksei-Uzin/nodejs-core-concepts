async function readFile(fileHandle) {
  const { size } = await fileHandle.stat();
  const buffer = Buffer.alloc(size);

  const offset = 0;
  const length = buffer.byteLength;
  const position = 0;

  await fileHandle.read(buffer, offset, length, position);

  return buffer.toString('utf-8');
}

export default readFile;
