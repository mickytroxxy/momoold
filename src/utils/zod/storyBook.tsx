import * as z from 'zod';

export const storyBookFormSchema = z.object({
  test1: z
    .string()
    .nonempty({message: 'test1 is required'})
    .min(4, {message: 'test1 is too short'}),
  test2: z
    .string()
    .nonempty({message: 'test2 is required'})
    .min(4, {message: 'test2 is too short'}),
});

export type storyBookFormType = z.infer<typeof storyBookFormSchema>;

const validateNumberFormat = (value: string) => {
  // Remove spaces and commas to get a raw number for validation
  const numberValue = value.replace(/[ ,]/g, '');
  console.log('numberValue', numberValue);
  if (!/^\d+$/.test(numberValue)) {
    return 'Please enter a valid number';
    // return false;
  }
  const numericValue = Number(numberValue);
  console.log('numericValue', numericValue);
  if (numericValue < 5 || numericValue > 2000) {
    return `Please enter a number between ${10} and ${20}`;
    // return false
  }
  // return undefined;
  return true;
};
export const sbCurrencySchema = ({
  max,
  currency,
}: {
  max: number;
  currency: string;
}) =>
  z.object({
    test1: z.string().nonempty({message: 'This field cannot be empty'}),
    test2: z
      .string()
      .nonempty('This field cannot be empty')
      // .refine(value => {
      //   const numberValue = value.replace(/[ ,]/g, ''); // Remove spaces and commas
      //   console.log('first', numberValue)
      //   return /^\d+$/.test(numberValue); // Check if it contains only
      // }, 'Please enter a valid number')
      .refine(value => {
        const numericValue = Number(value.replace(/[ ,]/g, '')); // Convert to numeric value
        console.log('numericValue', numericValue);
        if (numericValue <= 10) {
          return false;
        }
        return true;
      }, 'Level up brokee')
      .refine(value => {
        const numericValue = Number(value.replace(/[ ,]/g, '')); // Convert to numeric value
        console.log('numericValue', numericValue);
        if (numericValue > max) {
          return false;
        }
        return true;
      }, 'Elon Musk, calm down'),
  });
// .nonstrict();
const sop = sbCurrencySchema({max: 111, currency: 'sjsj'});
export type sbCurrencyType = z.infer<typeof sop>;

export const storyOtpSchema = z.object({
  test1: z.custom<{label: string; value: string}>(value => !!value, {
    message: 'bad bad',
  }),
});

export type storyBookOtpType = z.infer<typeof storyOtpSchema>;

export const storyCalendarSchema = z.object({
  from: z.string().nonempty({message: 'This field cannot be empty'}),
});

export type storyBookCalendarType = z.infer<typeof storyCalendarSchema>;
