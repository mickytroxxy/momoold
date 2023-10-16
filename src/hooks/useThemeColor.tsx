import {createTheme} from '@shopify/restyle';
import {useState} from 'react';
import {useColorScheme} from 'react-native';
import lightThemes, {darkThemes, palette} from '../style/theme';
import {Theme} from '../typings/globalTheme';

const useThemeColor = () => {
  const colorScheme = useColorScheme();
  const [primaryColor, setPrimaryColor] = useState(palette.white);
  let themeToBeUsed;
  let backgroundColor;
  let barStyle;

  const lightTheme = createTheme({
    ...lightThemes,
    colors: {
      ...lightThemes.colors,
      primaryColor,
    },
  });

  const darkTheme: Theme = {
    ...lightTheme,
    colors: {
      ...darkThemes.colors,
      primaryColor,
    },
  };

  const [theme, setTheme] = useState('light');

  switch (theme) {
    case 'light':
      themeToBeUsed = lightTheme;
      backgroundColor = '#fff';
      barStyle = 'dark-content';
      break;
    case 'dark':
      themeToBeUsed = darkTheme;
      backgroundColor = '#131414';
      barStyle = 'light-content';
      break;
    case 'auto':
      colorScheme === 'light'
        ? ((themeToBeUsed = lightTheme),
          (backgroundColor = '#fff'),
          (barStyle = 'dark-content'))
        : ((themeToBeUsed = darkTheme),
          (backgroundColor = '#131414'),
          (barStyle = 'light-content'));
      break;
    default:
      themeToBeUsed = lightTheme;
      backgroundColor = '#131414';
      barStyle = 'dark-content';
      break;
  }

  return {
    colorScheme,
    theme,
    setTheme,
    setPrimaryColor,
    themeToBeUsed,
  };
};

export default useThemeColor;
