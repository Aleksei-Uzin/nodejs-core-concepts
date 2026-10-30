import { Writable } from 'node:stream';
import fs from 'node:fs';

export class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });

    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writesCount = 0;
  }

  _construct(callback) {
    fs.open(this.fileName, 'w', (error, fd) => {
      if (error) {
        callback(error);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;

    if (this.chunksSize > this.writableHighWaterMark) {
      this._writeBuffer(Buffer.concat(this.chunks), error => {
        if (error) return callback(error);
        this.chunks = [];
        this.chunksSize = 0;
        this.writesCount += 1;
        callback();
      });
    } else {
      callback();
    }
  }

  _final(callback) {
    const buffer = Buffer.concat(this.chunks);
    this._writeBuffer(buffer, error => {
      if (error) return callback(error);
      if (buffer.length > 0) this.writesCount += 1;
      this.chunks = [];
      this.chunksSize = 0;
      callback();
    });
  }

  _writeBuffer(buffer, callback) {
    const writeNext = offset => {
      if (offset === buffer.length) return callback();

      fs.write(this.fd, buffer, offset, buffer.length - offset, null, (error, bytesWritten) => {
        if (error) return callback(error);
        if (bytesWritten === 0) {
          return callback(new Error('Unable to write remaining file data'));
        }

        writeNext(offset + bytesWritten);
      });
    };

    writeNext(0);
  }

  _destroy(error, callback) {
    console.log('Number of writes:', this.writesCount);

    if (this.fd !== null) {
      fs.close(this.fd, closeError => {
        this.fd = null;
        callback(closeError || error);
      });
    } else {
      callback(error);
    }
  }
}
