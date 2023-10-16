
export type MaskItem = string | RegExp | [RegExp];
export type MaskArray = Array<MaskItem>;
export type Mask = MaskArray | ((value?: string) => MaskArray);
type CreateNumberMaskProps = {
  /** Character for thousands delimiter. Defaults to `"."` */
  delimiter?: string;
  /** Decimal precision. Defaults to `2` */
  precision?: number;
  /** Decimal separator character. Defaults to `","`  */
  separator?: string;
  /** Mask to be prefixed on the mask result */
  prefix?: MaskArray;
};
export default function createNumberMask(props?: CreateNumberMaskProps): Mask {
  const {
    delimiter = '.',
    precision = 2,
    prefix = [],
    separator = ',',
  } = props || {};
  return (value?: string) => {
    const numericValue = value?.replace(/\D+/g, '') || '';
    let mask: MaskArray = numericValue.split('').map(() => /\d/);
    const shouldAddSeparatorOnMask = precision > 0 && !!separator;
    if (mask.length > precision && shouldAddSeparatorOnMask) {
      mask.splice(-precision, 0, separator);
    }
    const amountOfDelimiters =
      Math.ceil((numericValue.length - precision) / 3) - 1;
    if (delimiter) {
      for (let i = 0; i < amountOfDelimiters; i++) {
        const precisionOffset = precision;
        const separatorOffset = shouldAddSeparatorOnMask ? 1 : 0;
        const thousandOffset = 3 + (delimiter ? 1 : 0);
        const delimiterPosition =
          -precisionOffset - separatorOffset - i * thousandOffset - 3;
        mask.splice(delimiterPosition, 0, delimiter);
      }
    }
    // console.log(' [...prefix, ...mask]', [...prefix, ...mask]);
    return [...prefix, ...mask];
  };
}
