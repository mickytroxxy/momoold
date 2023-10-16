import {View} from 'react-native';
import Box from './Box';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';

const LineDivider = () => {
  const {colors} = useTheme<Theme>();
  return (
    <Box style={{width: 1, paddingVertical: 5}}>
      <Box
        style={{
          flex: 1,
          borderLeftColor: colors.lightGrey,
          borderLeftWidth: 1,
        }}/>
    </Box>
  );
};

export default LineDivider;
