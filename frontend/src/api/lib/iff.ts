//@ts-nocheck

export const fileTypes = {
  IFF: { name: 'IFF file' },
  ILBM: { name: 'ILBM Image', actions: ['show'], inspect: true },
  ANIM: { name: 'IFF ILBM Animation' },
};

const FILETYPE = {
  IFF: { name: 'IFF file' },
  PBM: { name: 'PBM Image' },
  ILBM: { name: 'ILBM Image', actions: ['show'], inspect: true },
  ANIM: { name: 'IFF ILBM Animation' },
};

//@ts-nocheck
export const detect = function (file: any) {
  const id = file.readString(4, 0);
  if (id === 'FORM') {
    const size = file.readDWord();
    if (size + 8 <= file.length) {
      // the size check isn't always exact for images?
      const format = file.readString(4);
      if (format === 'ILBM') {
        return FILETYPE.ILBM;
      }
      if (format === 'PBM ') {
        return FILETYPE.PBM;
      }
      if (format === 'ANIM') {
        return FILETYPE.ANIM;
      }
      return FILETYPE.IFF;
    }
  }
};

export const parse = (
  file: any,
  decodeBody: boolean,
  fileType: any,
  parent?: any
) => {
  const img = {
    palette: [],
  };
  let index = 12;

  function readChunk() {
    const chunk = {};
    chunk.name = file.readString(4);
    chunk.size = file.readDWord();
    return chunk;
  }

  while (index < file.length - 4) {
    file.goto(index);
    const chunk = readChunk();
    index += chunk.size + 8;
    if (chunk.size % 2 === 1) index++;

    switch (chunk.name) {
      case 'BMHD':
        img.width = file.readWord();
        img.height = file.readWord();
        img.x = file.readShort();
        img.y = file.readShort();
        img.numPlanes = file.readUbyte();
        img.mask = file.readUbyte();
        img.compression = file.readUbyte();
        img.pad = file.readUbyte();
        img.transparentColor = file.readWord();
        img.xAspect = file.readUbyte();
        img.yAspect = file.readUbyte();
        img.pageWidth = file.readWord();
        img.pageHeight = file.readWord();
        if (img.numPlanes && img.numPlanes < 9) {
          img.colors = 1 << img.numPlanes;
        }
        if (img.numPlanes == 24) {
          img.trueColor = true;
        }
        break;
      case 'CMAP':
        for (let i = 0, max = chunk.size / 3; i < max; i++) {
          img.palette.push([
            file.readUbyte(),
            file.readUbyte(),
            file.readUbyte(),
          ]);
        }
        break;
      case 'CRNG':
        img.colourRange = img.colourRange || [];
        file.readShort(); // padding
        const CRNGrange = {
          rate: file.readShort(), // 16384 = 60 steps/second
          flags: file.readShort(),
          low: file.readUbyte(),
          high: file.readUbyte(),
        };
        CRNGrange.fps = (CRNGrange.rate / 16384) * 60;
        CRNGrange.active = CRNGrange.flags & 1;
        CRNGrange.reverse = CRNGrange.flags & 2;
        img.colourRange.push(CRNGrange);
        break;
      case 'DRNG': {
        // Dpaint IV enhanced color cycle chunk.
        // https://wiki.amigaos.net/wiki/ILBM_IFF_Interleaved_Bitmap#ILBM.DRNG
        img.colourRange = img.colourRange || [];
        const range = {
          min: file.readUbyte(),
          max: file.readUbyte(),
          rate: file.readShort(),
          flags: file.readShort(),
          numberOfDColors: file.readUbyte(),
          colors: [],
          numberOfDIndexes: file.readUbyte(),
          indexes: [],
        };
        for (let i = 0; i < range.numberOfDColors; i++) {
          // true color RGB values. (Is this used? I've never seen it in the wild)
          range.colors.push({
            index: file.readUbyte(),
            red: file.readUbyte(),
            green: file.readUbyte(),
            blue: file.readUbyte(),
          });
        }

        for (let i = 0; i < range.numberOfDIndexes; i++) {
          // index values
          range.indexes.push({
            index: file.readUbyte(),
            colorIndex: file.readUbyte(),
          });
        }
        img.colourRange.push(range);
        break;
      }
      case 'CCRT':
        // Graphicraft Color Cycle chunk
        // https://wiki.amigaos.net/wiki/ILBM_IFF_Interleaved_Bitmap#ILBM.CCRT
        // examples: https://amiga.lychesis.net/applications/Graphicraft.html
        img.colourRange = img.colourRange || [];
        const CCRTRange = {
          direction: file.readWord(),
          low: file.readUbyte(),
          high: file.readUbyte(),
          seconds: file.readLong(),
          microseconds: file.readLong(),
          padding: file.readWord(),
        };
        CCRTRange.active = CCRTRange.direction !== 0;
        CCRTRange.fps =
          1 / (CCRTRange.seconds + CCRTRange.microseconds / 1000000);
        img.colourRange.push(CCRTRange);
        break;
      case 'CAMG':
        const v = file.readLong();
        img.interlaced = v & 0x4;
        img.ehb = v & 0x80;
        img.ham = v & 0x800;
        img.hires = v & 0x8000;
        break;
      case 'BODY':
        img.body = [];

        // adjust EHB and HAM palette here as the order of CMAP and CAMG is not defined;
        if (img.ehb) {
          for (i = 0; i < 32; i++) {
            const c = img.palette[i];
            img.palette[i + 32] = [c[0] >> 1, c[1] >> 1, c[2] >> 1];
          }
        }
        img.colorPlanes = img.numPlanes;
        if (img.ham) {
          img.hamPixels = [];
          img.colorPlanes = 6; // HAM8
          if (img.numPlanes < 7) img.colorPlanes = 4; // HAM6
        }

        // some images have bad CAMG blocks?
        if (!img.hires && img.width >= 640) img.hires = true;
        if (img.hires && !img.interlaced && img.height >= 400) {
          img.interlaced = true;
        }

        if (decodeBody) {
          if (fileType === FILETYPE.PBM) {
            const pixelData = [];

            if (img.compression) {
              // Decompress the data
              for (let i = 0; i < chunk.size; i++) {
                const byte = file.readUbyte();

                if (byte > 128) {
                  const nextByte = file.readUbyte();
                  for (let i = 0; i < 257 - byte; i++) {
                    pixelData.push(nextByte);
                  }
                } else if (byte < 128) {
                  for (let i = 0; i < byte + 1; i++) {
                    pixelData.push(file.readUbyte());
                  }
                } else {
                  break;
                }
              }
            } else {
              // Just copy the data
              // FIXME: Use BinaryStream.readBytes() ?
              for (let i = 0; i < chunk.size; i++) {
                pixelData.push(file.readUbyte());
              }
            }

            // Rearrange pixel data in the right format for rendering?
            // FIXME: Figure out why this needs to happen
            const pixels = [];
            for (let y = 0; y < img.height; y++) {
              pixels[y] = [];
              for (let x = 0; x < img.width; x++) {
                pixels[y][x] = pixelData[y * img.width + x];
              }
            }

            img.pixels = pixels;
          } else {
            const pixels = [];
            const planes = [];
            let lineWidth = (img.width + 15) >> 4; // in words
            lineWidth *= 2; // in bytes

            for (let y = 0; y < img.height; y++) {
              pixels[y] = [];
              if (img.ham) img.hamPixels[y] = [];

              for (let plane = 0; plane < img.numPlanes; plane++) {
                planes[plane] = planes[plane] || [];
                planes[plane][y] = planes[plane][y] || [];
                const line = [];
                if (img.compression) {
                  // RLE compression
                  let pCount = 0;
                  while (pCount < lineWidth) {
                    const b = file.readUbyte();
                    if (b === 128) break;
                    if (b > 128) {
                      const b2 = file.readUbyte();
                      for (let k = 0; k < 257 - b; k++) {
                        line.push(b2);
                        pCount++;
                      }
                    } else {
                      for (let k = 0; k <= b; k++) {
                        line.push(file.readUbyte());
                      }
                      pCount += b + 1;
                    }
                  }
                } else {
                  for (let x = 0; x < lineWidth; x++) {
                    line.push(file.readUbyte());
                  }
                }

                // add bitplane line to pixel values;
                for (let b = 0; b < lineWidth; b++) {
                  const val = line[b];
                  for (let i = 7; i >= 0; i--) {
                    const x = b * 8 + (7 - i);
                    const bit = val & (1 << i) ? 1 : 0;
                    if (plane < img.colorPlanes) {
                      const p = pixels[y][x] || 0;
                      pixels[y][x] = p + (bit << plane);
                      planes[plane][y][x] = bit;
                    } else {
                      p = img.hamPixels[y][x] || 0;
                      img.hamPixels[y][x] =
                        p + (bit << (plane - img.colorPlanes));
                    }
                  }
                }
              }
            }
            img.pixels = pixels;
            img.planes = planes;
          }
        }
        break;
      case 'FORM': // ANIM or other embedded IFF structure
        img.frames = img.frames || [];
        if (img.animFrameCount && img.frames.length >= img.animFrameCount) {
          console.log('ANIM: frame count exceeded, skipping frame');
          break;
        }
        const buffer = new ArrayBuffer(chunk.size + 8);
        const view = new DataView(buffer);
        file.readBytes(chunk.size + 8, file.index - 8, view);
        const subFile = new BinaryStream(buffer, true);
        const subImg = me.parse(subFile, true, fileType, img);
        if (subImg) {
          img.frames.push(subImg);
          if (img.frames.length === 1) {
            img.width = subImg.width;
            img.height = subImg.height;
            img.numPlanes = subImg.numPlanes;
            img.palette = subImg.palette;
            img.animFrameCount = subImg.animFrameCount;
          }
        }
        //console.error(subImg);
        break;
      case 'ANHD': // https://wiki.amigaos.net/wiki/ANIM_IFF_CEL_Animations#ANHD_Chunk
        img.animHeader = {
          compression: file.readUbyte(),
          mask: file.readUbyte(),
          width: file.readWord(),
          height: file.readWord(),
          x: file.readWord(),
          y: file.readWord(),
          absTime: file.readDWord(),
          relTime: file.readDWord(),
          interleave: file.readUbyte(),
          pad: file.readUbyte(),
          bits: file.readUbyte(),
          future: file.readUbyte(),
        };
        break;
      case 'DPAN':
        img.animVersion = file.readWord();
        img.animFrameCount = file.readWord();
        break;
      case 'DLTA': // https://wiki.amigaos.net/wiki/ANIM_IFF_CEL_Animations#DLTA_Chunk
        if (!parent) {
          console.error('Error: DLTA chunk without parent structure');
          return;
        }

        img.animHeader = img.animHeader || {};

        const sourceFrameIndex = Math.max(parent.frames.length - 2, 0);
        const frame = parent.frames[sourceFrameIndex];
        if (!frame) {
          console.error('Error: No frame to apply DLTA chunk to');
          return;
        }
        // copy reference frame;
        img.width = frame.width;
        img.height = frame.height;
        img.palette = frame.palette;
        img.planes = [];

        // TODO: this is slow...
        frame.planes.forEach((plane) => {
          const newPlane = [];
          plane.forEach((line) => newPlane.push(line.slice()));
          img.planes.push(newPlane);
        });

        if (sourceFrameIndex > 0) {
          //parent.frames[sourceFrameIndex-1].planes = undefined;
        }

        switch (img.animHeader.compression) {
          case 0: // No compression
            break;
          case 1: // XOR compression
            console.warn('unhandled ANIM compression: XOR');
            break;
          case 2: // long Delta compression
            console.warn('unhandled ANIM compression: long Delta');
            break;
          case 3: // short Delta compression
            console.warn('unhandled ANIM compression: short Delta');
            break;
          case 4: // Generalized Delta compression
            console.warn('unhandled ANIM compression: Generalized Delta');
            break;
          case 5: // Byte Vertical Delta compression
            // This is the default compression method for Deluxe Paint Animations.

            const startIndex = file.index;
            const pointers = [];
            for (let i = 0; i < 8; i++) pointers.push(file.readDWord());
            const colCount = ((parent.width + 15) >>> 4) << 1;
            const bitPlaneCount = Math.min(parent.numPlanes, 8);

            for (
              let bitPlaneIndex = 0;
              bitPlaneIndex < bitPlaneCount;
              bitPlaneIndex++
            ) {
              const pointer = pointers[bitPlaneIndex];
              if (pointer) {
                //console.log('handling bitPlaneIndex ' + bitPlaneIndex + ' at ' + pointer);
                file.goto(startIndex + pointer);

                for (let colIndex = 0; colIndex < colCount; colIndex++) {
                  const opCount = file.readUbyte();
                  if (opCount === 0) continue;
                  //console.warn(opCount + " opCounts in column " + colIndex);
                  let destinationIndex = 0;
                  for (let opIndex = 0; opIndex < opCount; opIndex++) {
                    let opCode = file.readUbyte();
                    //console.warn("opCode", opCode);
                    if (opCode === 0) {
                      //Same ops
                      const copyCount = file.readUbyte();
                      const byteToCopy = file.readUbyte();
                      //console.warn("copy",byteToCopy,copyCount);
                      for (let i = 0; i < copyCount; i++) {
                        const y = destinationIndex;
                        //data[(destinationIndex * bitPlaneCount + bitPlaneIndex) * colCount + colIndex] = byteToCopy;
                        for (let bi = 7; bi >= 0; bi--) {
                          const x = colIndex * 8 + 7 - bi;
                          const bit = byteToCopy & (1 << bi) ? 1 : 0;
                          img.planes[bitPlaneIndex][y][x] = bit;
                        }
                        destinationIndex++;
                      }
                    } else if (opCode < 128) {
                      // Skip ops: jump over opCode pixels
                      destinationIndex += opCode;
                      //console.warn("skip to line",destinationIndex);
                    } else {
                      // Uniq ops: read opCode pixels
                      opCode -= 128;
                      for (let i = 0; i < opCode; i++) {
                        const b = file.readUbyte();
                        const y = destinationIndex;
                        const bits = [];

                        if (destinationIndex < img.height) {
                          for (let bi = 7; bi >= 0; bi--) {
                            const x = colIndex * 8 + 7 - bi;
                            const bit = b & (1 << bi) ? 1 : 0;
                            img.planes[bitPlaneIndex][y][x] = bit;
                            bits.push(bit);
                          }

                          destinationIndex++;
                        }
                      }
                    }
                  }
                }
              }
            }
            break;
          case 6: // Stereo op 5 compression
            console.warn('unhandled ANIM compression: Stereo op 5');
            break;
          case 7: // short/long Vertical Delta mode
            console.warn(
              'unhandled ANIM compression: short/long Vertical Delta'
            );
            break;
          default:
            console.error(
              `unhandled ANIM compression: ${img.animHeader.compression}`
            );
        }

        const now = performance.now();
        // planes to pixels
        img.pixels = [];
        for (let y = 0; y < img.height; y++) {
          const line = [];
          for (let x = 0; x < img.width; x++) {
            let pixel = 0;
            for (
              let bitPlaneIndex = 0;
              bitPlaneIndex < parent.numPlanes;
              bitPlaneIndex++
            ) {
              const bit = img.planes[bitPlaneIndex][y][x];
              pixel += bit << bitPlaneIndex;
            }
            line.push(pixel);
          }
          img.pixels.push(line);
        }
        //console.log("to pixels", performance.now() - now);

        break;
      default:
        console.warn(`unhandled IFF chunk: ${chunk.name}`);
        break;
    }
  }

  return img;
};
