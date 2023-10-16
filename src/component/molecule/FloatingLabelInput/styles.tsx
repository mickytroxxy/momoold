import {inputDefault} from '@/style-dictionary-dist/momoStyle';
import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';
import {StyleSheet} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: getFontSizeByWindowWidth(15),
    // borderRadius: 15,
    backgroundColor: '#00000000',
    alignContent: 'center',
    justifyContent: 'center',
    // paddingTop: 10,
    // paddingBottom: 10,
    // color: '#49658c',
    // borderWidth: 2,
  },
  input: {
    minHeight: getFontSizeByWindowHeight(56),
    // width: 282,
    fontFamily: 'MTNBrighterSans-Regular',
    fontSize: getFontSizeByWindowHeight(16),
    paddingVertical: 0,
    paddingHorizontal: 0,
    // flex: 1,
    zIndex: 10,
    // color: 'black'
    // color: inputDefault.color
  },
  img: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  toggleButton: {
    zIndex: 11,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    // backgroundColor: "red",
    paddingVertical: 7,
    // paddingHorizontal: 10
    paddingLeft: 10,
  },
  countdown: {
    position: 'absolute',
    right: 11,
    bottom: 0,
    color: '#49658c',
    fontSize: 10,
  },
});
