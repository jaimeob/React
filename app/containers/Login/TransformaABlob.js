export default (str) => {
  const hexStr = str.slice(2);
  const buf = new ArrayBuffer(hexStr.length);
  const byteBuf = new Uint8Array(buf);

  for (let i=0; i<hexStr.length; i+=2) {
    byteBuf[i/2] = parseInt(hexStr.slice(i,i+2),16);
  }
  const blob = new Blob([byteBuf], {type: "image/jpg"});
  return URL.createObjectURL(blob);
};