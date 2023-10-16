import {AppRegistry} from 'react-native';
import {getStorybookUI} from '@storybook/react-native';
import {name as appName} from '../app.json';
import './storybook.requires';
import {ThemeProvider} from '@shopify/restyle';
import useThemeColor from '../src/hooks/useThemeColor';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, {persistor} from '@/store/store';
import { ClickOutsideProvider } from 'react-native-click-outside';

const StorybookUIRoot = getStorybookUI({});

const Story = () => {
  const {themeToBeUsed} = useThemeColor();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ClickOutsideProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={themeToBeUsed}>
            <NavigationContainer>
              <StorybookUIRoot />
            </NavigationContainer>
          </ThemeProvider>
        </PersistGate>
      </Provider>
      </ClickOutsideProvider>
    </GestureHandlerRootView>
  );
};

export default Story;
