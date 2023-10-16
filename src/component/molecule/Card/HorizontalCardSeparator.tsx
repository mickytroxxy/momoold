import {getFontSizeByWindowHeight, getFontSizeByWindowWidth} from '@/style/theme';
import {Box} from '@atom';
import {StyleSheet} from 'react-native';

type HorizontalCardSeparatorType = {
  w?: any;
};

const HorizontalCardSeparator = ({
  w = StyleSheet.hairlineWidth,
}: HorizontalCardSeparatorType) => (
  <Box
    bg={'extraLightGrey'}
    height={getFontSizeByWindowHeight(w)}
    // height={0.5}
  />
);

export default HorizontalCardSeparator;
