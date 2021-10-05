export function doTruncarStr(str: string, size: number) {
  if (
    str == undefined ||
    str == "undefined" ||
    str == "" ||
    size == undefined
  ) {
    return str;
  }

  var shortText = str;
  if (str.length >= size + 3) {
    shortText = str.substring(0, size).concat("...");
  }
  return shortText;
}
