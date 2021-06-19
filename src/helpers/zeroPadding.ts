type zeroPaddingType = (number: number, fillString?: number) => string;

/**
 * ゼロパディングするhelper関数
 * @param number - 元の数値
 * @param fillString - 何桁まで埋めるか
 */
export const zeroPadding: zeroPaddingType = (number, fillString = 2) => {
  return String(number).padStart(fillString, '0');
};
