import Box, { BoxProps } from '@/component/atom/Box';
import {Theme} from '../../../style/theme';
import {
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';

type Props = VariantProps<Theme, 'cardVariants'> & BoxProps;

const Card = createRestyleComponent<Props, Theme>(
  [createVariant({themeKey: 'cardVariants'})],
  Box,
);

export default Card;
