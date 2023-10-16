import icon from '@/constants/icon';
import useDimension from '@/hooks/useDimension';
import {Box, Text} from '@atom';
import {ReactNode} from 'react';
import {Dimensions} from 'react-native';
import Modal from 'react-native-modal';

type overlayType = {
  open: boolean;
  setModalVisible: any;
  children: ReactNode;
};

const Overlay = ({open, setModalVisible, children}: overlayType) => {
  const {width, height} = useDimension();
  const {UpIcon} = icon;
  return (
    <Modal
      onSwipeComplete={() => setModalVisible(false)}
      style={{margin: 0}}
      swipeDirection={'down'}
      hideModalContentWhileAnimating={true}
      onBackButtonPress={() => setModalVisible(false)}
      isVisible={open}
      statusBarTranslucent>
      <Box flex={1} justifyContent={'flex-end'}>
        <Box
          style={{
            // flex: 1,
            backgroundColor: 'white',
            height: 0.5 * height,
            borderTopRightRadius: 18,
            borderTopLeftRadius: 18,
          }}>
          <Box alignItems={'center'} py={'vsm'}>
            <UpIcon />
          </Box>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default Overlay;
