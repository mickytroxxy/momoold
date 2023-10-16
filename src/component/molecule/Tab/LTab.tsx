import TouchableOpacity from '@/component/atom/TouchableOpacity';
import React, {useState} from 'react';
import {Box, Text} from '../../atom';
import {CardContent1, CardContent2} from '@molecule/Card/CardContent1';

const LTab = () => {
  const tabData = ['SUGGESTED', 'PAY', 'RECHARGE'];
  const [tabIndex, setTabIndex] = useState(0);
  const toggleTab = (index: number) => {
    setTabIndex(index);
  };
  function renderHeader() {
    return (
      <Box
        flexDirection={'row'}
        // bg={'red100'}
        flex={1}
        py={'vm'}
        px={'hm'}
        >
        {tabData.map((v, i) => (
          <TouchableOpacity
            key={v}
            onPress={() => toggleTab(i)}
            activeOpacity={0.7}
            px={'hsm'}
          >
            <Box gap={'vsm'}>
              <Text
                color={i === tabIndex ? 'momoBlue' : 'lightGrey'}
                fontFamily={'MTNBrighterSans-Bold'}>
                {v}
              </Text>
              <Box
                borderTopLeftRadius={6}
                borderTopRightRadius={6}
                height={4}
                bg={i === tabIndex ? 'sunshineYellow' : 'transparent'}
              />
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
    );
  }

  function renderCard({title}: {title: string}) {
    return (
      <Box
        bg={'extraLightGrey'}
        height={500}
        justifyContent={'center'}
        alignItems={'center'}>
        <Text
          color={'momoBlue'}
          variant={'headings'}
          lineHeight={36}
          fontSize={29}>
          {title}
        </Text>
      </Box>
    );
  }
  return (
    <Box>
      {renderHeader()}
      {tabIndex === 0 && renderCard({title: 'SUGGESTED'})}
      {tabIndex === 1 && renderCard({title: 'PAY'})}
      {tabIndex === 2 && renderCard({title: 'RECHARGE'})}
    </Box>
  );
};

export default LTab;
