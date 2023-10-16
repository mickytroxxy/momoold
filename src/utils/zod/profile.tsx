import {countryDataType} from '@molecule/Dropdown/CountryDropdown';
import * as z from 'zod';

export const profileSchema = z.object({
  'First name': z.string().min(1, {message: 'first name required'}),
  'Last name': z
    .string()
    .nonempty({message: 'last name required'})
    .min(4, {message: 'last name too short'}),
  phone: z
    .string()
    .nonempty({message: 'phone is required'})
    .min(4, {message: 'phone is too short'}),
  password: z
    .string()
    // .nonempty({message: 'phone is required'})
    .min(4, {message: 'phone is too short'}),

  country: z.custom<countryDataType>(value => !!value, {message: 'bad bad'}),
  // .string()
  // .nonempty({message: 'country is required'})
  // .min(4, {message: 'country is too short'}),
});
// interface IFormValues {

// }
// .refine((schema) => schema.password === schema.password1, {
//   message: "Paswords does not match",
//   path: ["password1"],
// });
export type profileFormType = z.infer<typeof profileSchema>;
