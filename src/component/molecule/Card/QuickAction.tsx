import TouchableOpacity from '@/component/atom/TouchableOpacity';
import icons from '@/constants/icon';
import {
  getFontSizeByWindowHeight as gsh,
  getFontSizeByWindowWidth as gsw,
} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {Box, Text} from '@atom';
import {useTheme} from '@shopify/restyle';
import {moderateScale} from 'react-native-size-matters';
import { Card } from '@molecule/index';
type QuickActionType = {
  title?: string;
  subtitle?: string;
  icon?: any;
  bg?: 'white' | 'colored';
  disabled?: boolean;
  onPress?:() => void;
  renderRightIcon?:any;
};

const QuickAction = ({
  title,
  subtitle,
  icon,
  bg,
  disabled,
  onPress,
  renderRightIcon
}: QuickActionType) => {
  const {colors, spacing} = useTheme<Theme>();
  const {RightIcon, SettingsIcon} = icons;
  return (
    <Card elevation={10} borderRadius={15}>
      <TouchableOpacity
        activeOpacity={0.8}
        alignItems={'center'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        //   opacity={0.7}
        onPress={onPress && onPress}
        style={{
          backgroundColor: disabled
            ? '#4D849C'
            : bg === 'colored'
            ? colors.momoBlue
            : 'white',
          paddingHorizontal: gsw(10),
          paddingVertical: 20,
          borderRadius: 15,
        }}>
        <Box
          alignItems={'center'}
          flexDirection={'row'}
          style={{gap: gsw(10)}}>
          {icon && icon()}
          <Box>
            <Text
              style={{
                fontSize: gsw(12),
                lineHeight: gsw(15.6),
                fontFamily: 'MTNBrighterSans-Medium',
              }}>
              {title}
            </Text>
            {subtitle && (
              <Text
                style={{
                  fontSize: gsw(9),
                  lineHeight: gsw(11.6),
                  color: bg !== 'colored' ? '#5F5F5F' : 'white',
                }}>
                {subtitle}
              </Text>
            )}
          </Box>
        </Box>

        {renderRightIcon && renderRightIcon()}
      </TouchableOpacity>
    </Card>
  );
};

export default QuickAction;
