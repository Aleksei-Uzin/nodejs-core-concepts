const DEFAULT_SIZE_MB = 20;

function getSizeInMegabytes() {
  const arg = process.argv.find(arg => arg.startsWith('--size='));

  if (!arg) {
    return DEFAULT_SIZE_MB;
  }

  const size = Number(arg.split('=')[1]);

  if (!Number.isFinite(size) || size <= 0) {
    throw new Error('Size must be a positive number.');
  }

  return size;
}

export default getSizeInMegabytes;
