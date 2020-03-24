export default function hasJSONStructure(str) {
  if (typeof str !== 'string') return false;
  try {
    const result = JSON.parse(str);
    return Object.prototype.toString.call(result) === '[object Object]' 
      || Array.isArray(result);
  } catch (err) {
    return false;
  }
}
