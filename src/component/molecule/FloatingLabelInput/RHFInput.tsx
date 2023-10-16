import FLabelInput, {Props} from '@molecule/FloatingLabelInput/FLabelInput';
import React from 'react';
import {Controller} from 'react-hook-form';
// import createNumberMask from './Mask';
import formatWithMask from './Mask';
import createNumberMask from './CreateMask';

type RHFInputType = Partial<Props> & {
  control: any;
  name: string;
  label?: string;
  number?: boolean;
};
const customOptions = {
  delimiter: ' ',
  prefix: [''],
};
// const formattedValueResult = formatWithMask({
//     text: '10000',
//     mask: [/\d/, /\d/, /\d/, '.', /\d/, /\d/],
//   });
const dollarMask = createNumberMask({
  // prefix: ['R', '$', ' '],
  delimiter: ' ',
  separator: '.',
  precision: 0,
});
const RHFInput = ({control, name, label, number, ...props}: RHFInputType) => {
  const formatNumber = (value: string) => {
    const formattedValueResult = formatWithMask({
      text: value,
      //@ts-ignore
      mask: dollarMask(value),
    });
    return formattedValueResult.masked;
  };
  return (
    <>
      <Controller
        control={control}
        render={({
          field: {onChange, onBlur, value, ref},
          fieldState: {error},
        }) => (
          <FLabelInput
            ref={ref}
            label={label || name}
            onChangeText={text => {
              const as = Number(text);
              const formattedText = formatNumber(text);
              number ? onChange(formattedText) : onChange(text);
            }}
            value={number ? value?.toString() : value}
            // value={value}
            error={error?.message}
            {...props}
          />
        )}
        name={name}
      />
    </>
  );
};

export default RHFInput;
