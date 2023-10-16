import { createText } from '@shopify/restyle'
import { Theme } from '../../typings/globalTheme'
// import { Theme } from '../../style/theme'

const Text = createText<Theme>()
export type TextProps = React.ComponentProps<typeof Text>

export default Text

// import React from 'react';
// import { Text as RNText } from 'react-native';
// import { createText } from '@shopify/restyle';

// const restyleText = createText();

// const DefaultText = ({ children, ...rest }) => {
//   return <RNText {...restyleText} {...rest}>{children}</RNText>;
// };

// export default DefaultText;