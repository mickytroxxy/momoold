import {zodResolver} from '@hookform/resolvers/zod';
import React from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {z} from 'zod';
import CustomInput from '../../../componenets/common/CustonInput';

// Define the schema for form validation using zod
const signupSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
  mobile_number: z
    .string()
    .nonempty('mobile number is required')
    .min(10, {message: 'mobile number must contain at leas 10 digits'}),
  first_name: z.string().nonempty('first name is required'),
  last_name: z.string().nonempty('last name is required'),
  user_name: z.string().nonempty('user name is required'),
});

type SignupFormInputs = z.infer<typeof signupSchema>;

// "mobile_number": "1234567890",
// "first_name": "jimmy",
// "last_name": "jones",
// "user_name": "vlakkoder",
// "email": "jimsky119@gmail.com",

const SignupScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupFormInputs>({resolver: zodResolver(signupSchema)});

  const passwordInputRef = React.useRef<TextInput>(null);

  const onSubmit = (data: SignupFormInputs) => {
    console.log(data);
    // Perform signup logic here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>COMVIVA</Text>

      <CustomInput
        label="Email"
        error={errors.email?.message}
        control={control}
        name="email"
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <CustomInput
        ref={passwordInputRef}
        label="Phone Number"
        error={errors.mobile_number?.message}
        control={control}
        name="mobile_number"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onSubmit)}
      />
      <CustomInput
        ref={passwordInputRef}
        label="First Name"
        error={errors.first_name?.message}
        control={control}
        name="first_name"
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onSubmit)}
      />
      <CustomInput
        ref={passwordInputRef}
        label="Last Name"
        error={errors.last_name?.message}
        control={control}
        name="last_name"
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onSubmit)}
      />
      <CustomInput
        ref={passwordInputRef}
        label="User Name"
        error={errors.user_name?.message}
        control={control}
        name="user_name"
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onSubmit)}
      />
      {/* <CustomInput
        ref={passwordInputRef}
        label="Password"
        error={errors.password?.message}
        control={control}
        name="password"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onSubmit)}
      /> */}
      <CustomInput
        ref={passwordInputRef}
        label="Password"
        error={errors.password?.message}
        control={control}
        name="password"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onSubmit)}
      />

      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={{}}>Signup</Text>
        {/* <Text style={styles.signupText}>Signup</Text> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#333',
    marginBottom: 50,
  },
  inputView: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: '#333',
  },
  inputText: {
    height: 50,
    backgroundColor: '#555',
    borderRadius: 25,
    color: '#fff',
    paddingHorizontal: 20,
  },
  signupButton: {
    width: '80%',
    backgroundColor: '#f08080',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default SignupScreen;
