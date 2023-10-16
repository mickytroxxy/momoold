import {createBox} from '@shopify/restyle';
import {Theme} from '../../typings/globalTheme';

const Box = createBox<Theme>();

export type BoxProps = React.ComponentProps<typeof Box>

export default Box;
