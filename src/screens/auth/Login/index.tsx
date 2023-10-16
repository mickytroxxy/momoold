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
import {useNavigation} from '@react-navigation/native';
import {useLoginMutation} from '../../../api/nodeApi/session/api';
import {useTypedDispatch} from '../../../store/store';
import {authSlice} from '../../../features/auth/authSlice';

// Define the schema for form validation using zod
const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .nonempty('Email is required'),
  password: z.string().nonempty('Password is required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormInputs>({resolver: zodResolver(loginSchema)});
  const dispatch = useTypedDispatch();

  const {navigate} = useNavigation();
  const passwordInputRef = React.useRef<TextInput>(null);
  const [login, {error, data}] = useLoginMutation();

  console.log('loginerror', error);
  // console.log('logindata', data);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      console.log(data);
      const losss = await login(data);
      console.log('losss', losss);
      if (losss?.error) {
        // throw Error;
        return;
      }
      // await dispatch(authSlice.actions.updateToken(losss?.data?.data));
      // dispatch(login)
    } catch (error) {
      console.log('errorpie', error);
    }
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
        label="Password"
        error={errors.password?.message}
        control={control}
        name="password"
        secureTextEntry
        returnKeyType="done"
        onSubmitEditing={handleSubmit(onSubmit)}
      />
      {/* <Text style={{color:  colors.red100 }}>{error?.data?.message}</Text> */}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={{}}>Login</Text>
        {/* <Text style={styles.loginText}>Login</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: 10}}
        onPress={() => navigate('signup')}>
        <Text>Click here to Sign Up</Text>
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
  loginButton: {
    width: '80%',
    backgroundColor: '#f08080',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
