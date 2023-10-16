import {bannerImage} from '@/constants/images';
import {getFontSizeByWindowHeight} from '@/style/theme';
import {Box, Icon} from '@atom';
import {Card, Menu, MenuContent, VerticalSeparator} from '@molecule';
import React from 'react';
import {Image} from 'react-native';

const {recmomobanner} = bannerImage;
const ForYou = () => {
  return (
    <Box py={'vs'} gap={'vs'} flex={1} bg={'extraLightGrey'} px={'hm'}>
      <Menu>
        <MenuContent
          icon={<Icon name="MomotransferIcon" size={24} />}
          label="MoMo transfer"
        />
        <VerticalSeparator />
        <MenuContent icon={<Icon name="BillsIcon" size={24} />} label="Bills" />
      </Menu>
      <Card
        bg={'white'}
        flexDirection={'row'}
        style={{paddingVertical: getFontSizeByWindowHeight(16)}}>
        <MenuContent
          icon={<Icon name="DatabundlesIcon" size={24} />}
          label="Data Bundles"
        />
        <VerticalSeparator />
        <MenuContent
          // icon={<Icon name="AirtimeIcon" size={24}  />}
          icon={<Icon name="BillsIcon" size={24} />}
          label="Airtime"
        />
      </Card>
      <Box
        // height={getFontSizeByWindowWidth(104)}
        height={104}
        borderRadius={16}
        overflow={'hidden'}
        alignItems={'center'}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          source={recmomobanner}
        />
      </Box>
    </Box>
  );
};

export default ForYou;
