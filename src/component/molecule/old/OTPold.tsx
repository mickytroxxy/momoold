import React, {useState, useRef, useEffect} from 'react';
import {TextInput, StyleSheet, View, Button, Platform} from 'react-native';
// import SmsRetriever from 'react-native-sms-retriever';

const OTPTextInput: React.FC = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  //   const [otp, setOTP] = useState(['', '', '', '']);
//   const inputs = useRef<(TextInput|null)[]>([null]);
//   const inputs = [...Array(6)].map(() => useRef<TextInput>(null));
  const inputs = useRef<TextInput[]>([]);
//   const inputs = useRef<(TextInput | null)[]>([null]);
  const [focusedIndex, setFocusedIndex] = useState(false);
  //   const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleOTPChange = (text: string, index: number) => {
    const otpDigits = [...otp];
    otpDigits[index] = text;
    setOTP(otpDigits);

    // Auto-focus to the previous TextInput when deleting
    if (text === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (text !== '' && index < otpDigits.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleReset = () => {
    setOTP(['', '', '', '', '', '']);
    inputs.current[0]?.focus();
  };

  //   useEffect(() => {
  //     const startSMSListener = async () => {
  //       try {
  //         if (Platform.OS === 'ios') {
  //           const consentGranted = await SmsRetriever.requestPhoneNumber();
  //           if (consentGranted) {
  //             SmsRetriever.startSmsListener();
  //           }
  //         } else {
  //           const registered = await SmsRetriever.startSmsRetriever();
  //           if (registered) {
  //             SmsRetriever.addSmsListener((event) => {
  //               const otpRegex = /(\d{4})/; // Adjust the regex pattern as per your OTP format
  //               const otpMatch = event.message.match(otpRegex);
  //               if (otpMatch) {
  //                 const otpDigits = otpMatch[0].split('');
  //                 setOTP(otpDigits);
  //               }
  //             });
  //           }
  //         }
  //       } catch (error) {
  //         console.log('SMS retrieval error:', error);
  //       }
  //     };

  //     startSMSListener();

  //     return () => {
  //       SmsRetriever.removeSmsListener();
  //     };
  //   }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={[styles.input, focusedIndex && styles.inputFocused]}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleOTPChange(text, index)}
            value={digit}
            ref={inputs.current[index]}
            // ref={ref => (inputs.current[index] = ref)}
            autoFocus={index === 0}
            onFocus={() => setFocusedIndex(true)}
            onBlur={() => setFocusedIndex(false)}
            // onFocus={() => handleInputFocus(index)}
            // onBlur={handleInputBlur}
          />
        ))}
      </View>
      <Button title="Reset" onPress={handleReset} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10,
    fontSize: 20,
    marginHorizontal: 5,
    textAlign: 'center',
    borderRadius: 10,
    fontFamily: 'MTNBrighterSans-Bold',
},
  inputFocused: {
    borderWidth: 2,
    borderColor: '#004F71',
  },
});

export default OTPTextInput;
