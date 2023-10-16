export type MaskItem = string | RegExp | [RegExp];
export type MaskArray = Array<MaskItem>;
export type Mask = MaskArray | ((value?: string) => MaskArray);
export type FormatWithMaskResult = {
  masked: string;
};
export type FormatWithMaskProps = {
  text?: string;
  mask?: Mask;
};
// const formattedValueResult = formatWithMask({
//     text: '10000',
//     mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/],
//   });
export default function formatWithMask(
  props: FormatWithMaskProps,
): FormatWithMaskResult {
  const {text, mask} = props;
  if (!text) return {masked: ''};
  if (!mask) return {masked: text || ''};
  let maskArray = typeof mask === 'function' ? mask(text) : mask;
  let masked = '';
  let maskCharIndex = 0;
  let valueCharIndex = 0;
  while (maskCharIndex < maskArray.length && valueCharIndex < text.length) {
    let maskChar = maskArray[maskCharIndex];
    let valueChar = text[valueCharIndex];
    if (maskChar === valueChar) {
      masked += maskChar;
      valueCharIndex++;
      maskCharIndex++;
    } else if (typeof maskChar === 'object') {
      valueCharIndex++;
      const maskCharRegex = Array.isArray(maskChar) ? maskChar[0] : maskChar;
      const matchRegex = RegExp(maskCharRegex).test(valueChar);
      if (matchRegex) {
        masked += valueChar;
        maskCharIndex++;
      }
    } else {
      masked += maskChar;
      maskCharIndex++;
    }
  }
  return {masked};
}
