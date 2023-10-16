import { Box } from '@/component/atom';
import { BoxProps } from '@/component/atom/Box';
import React, { ReactNode } from 'react';

type HeaderType = BoxProps & {
  children?: ReactNode;
};

const Header = ({children, ...rest}: HeaderType) => {
  return <Box bg={'momoBlue'} {...rest}>{children}</Box>;
};

export default Header;

// import { Theme } from '@/typings/globalTheme'
// import { createText } from '@shopify/restyle'
// // import { Theme } from '../../style/theme'

// const Text = createText<Theme>()
// export type TextProps = React.ComponentProps<typeof Text>

// export default Header
