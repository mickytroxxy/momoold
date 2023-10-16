import {
  getFontSizeByWindowHeight,
  getFontSizeByWindowWidth,
} from '@/style/theme';
import {Box} from '@atom';

type VerticalSeparatorType = {
  mv?: any;
  mb?: any;
  mt?: any;
};
export default ({mv = 0, mb = 0, mt = 0}: VerticalSeparatorType) => (
  <Box
    bg={'sunshineYellow'}
    alignSelf={'stretch'}
    // width={getFontSizeByWindowWidth(StyleSheet.hairlineWidth)}
    width={getFontSizeByWindowWidth(0.4)}
    style={[
      mv && {
        marginVertical: getFontSizeByWindowHeight(mv),
      },
      mt && {marginTop: getFontSizeByWindowHeight(mt)},
      mb && {marginBottom: getFontSizeByWindowHeight(mb)},
    ]}
  />
);
