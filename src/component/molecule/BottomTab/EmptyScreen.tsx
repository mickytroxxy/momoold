import React from 'react';
import {Box, Text} from '@atom';

const EmptyScreen = () => {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Text color={'black'} fontSize={20}>Empty Screen</Text>
    </Box>
  );
};

export default EmptyScreen;
