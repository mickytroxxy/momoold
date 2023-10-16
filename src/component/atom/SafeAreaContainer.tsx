import {SafeAreaView} from '@/component/atom';
import {DarkStatusBar} from '@/component/molecule/StausBar';
import {Theme} from '@/typings/globalTheme';
import {useTheme} from '@shopify/restyle';
import {SafeAreaViewProps} from './SafeAreaView';

type SafeAreaContainerProps = {
  children: React.ReactNode;
} & SafeAreaViewProps;

const SafeAreaContainer = ({children, ...props}: SafeAreaContainerProps) => {
  const {colors, spacing} = useTheme<Theme>();
  return (
    <SafeAreaView  flex={1} {...props}>
      <DarkStatusBar />
      {children}
    </SafeAreaView>
  );
};


export default SafeAreaContainer;
