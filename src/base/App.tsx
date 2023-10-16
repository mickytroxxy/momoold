/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {ThemeContext} from '@/context/themeContext';
import useThemeColor from '@/hooks/useThemeColor';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RootStackNavigator from '../navigation/RootStackNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import Snackbar from '@molecule/Alert/Alert';
import {Provider} from 'react-redux';
import store, {persistor} from '@/store/store';
import {ClickOutsideProvider} from 'react-native-click-outside';
import { DarkStatusBar } from '@molecule/StausBar';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const {theme, setTheme, setPrimaryColor, themeToBeUsed} = useThemeColor();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ClickOutsideProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeContext.Provider value={[theme, setTheme, setPrimaryColor]}>
              <ThemeProvider theme={themeToBeUsed}>
                <NavigationContainer>
                  {/* <StatusBar
                    backgroundColor={backgroundStyle.backgroundColor}
                    barStyle={'light-content'}
                  /> */}
                  {/* <DarkStatusBar /> */}
                  <RootStackNavigator />
                </NavigationContainer>
              </ThemeProvider>
            </ThemeContext.Provider>
          </PersistGate>
        </Provider>
      </ClickOutsideProvider>
    </GestureHandlerRootView>
  );
}

export default App;
