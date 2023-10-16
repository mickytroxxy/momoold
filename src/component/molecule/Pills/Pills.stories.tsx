import ScrollView from '../../atom/ScrollView';
import {Meta, StoryObj} from '@storybook/react-native';
import React, {useState} from 'react';
import Pills from './Pills';
import {withBackgrounds} from '@storybook/addon-ondevice-backgrounds';
import {Box, Text} from '../../atom';
// import { Box, Text } from '@/component/atom';

const PillsMeta: Meta<typeof Pills> = {
  title: 'Controls/Pills',
  component: Pills,
  argTypes: {
    disabled: {
      label: 'disabled',
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    withBackgrounds,
    Story => (
      <ScrollView
        py={'vm'}
        flex={1}
        contentContainerStyle={{
          paddingBottom: 100,
          justifyContent: 'center',
          flexGrow: 1,
        }}
        paddingHorizontal={'vm'}>
        <Text
          textAlign={'center'}
          variant={'header'}
          mb={'vxl'}
          textDecorationLine={'underline'}>
          Pills
        </Text>
        <Story />
      </ScrollView>
    ),
  ],
};

type story = StoryObj<typeof PillsMeta>;

// export const Default: story = {};

export const Pill: StoryObj<typeof PillsMeta> = {
  render: args => {
    const [checked, setchecked] = useState(false);
    return (
      <Box gap={'vxl'}>
        <Box gap={'vl'}>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Bundles
            </Text>
            <Pills size="small" label="Daily" pillType="bundles" />
            <Pills size="small" label="Weekly" pillType="bundles" />
            <Pills size="small" label="Monthly" pillType="bundles" />
            <Pills size="small" label="Flexi Bundle" pillType="bundles" />
            <Pills size="small" label="Video" pillType="bundles" />
            <Pills size="small" label="Overdue" pillType="bundles" />
          </Box>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Bundles - Medium
            </Text>
            <Pills size="medium" label="Daily" pillType="bundles" />
            <Pills size="medium" label="Weekly" pillType="bundles" />
            <Pills size="medium" label="Monthly" pillType="bundles" />
            <Pills size="medium" label="Flexi Bundle" pillType="bundles" />
            <Pills size="medium" label="Video" pillType="bundles" />
            <Pills size="medium" label="Overdue" pillType="bundles" />
          </Box>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Bundles
            </Text>
            <Pills size="large" label="Daily" pillType="bundles" />
            <Pills size="large" label="Weekly" pillType="bundles" />
            <Pills size="large" label="Monthly" pillType="bundles" />
            <Pills size="large" label="Flexi Bundle" pillType="bundles" />
            <Pills size="large" label="Video" pillType="bundles" />
            <Pills size="large" label="Overdue" pillType="bundles" />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const Packages: StoryObj<typeof PillsMeta> = {
  render: args => {
    const [checked, setchecked] = useState(false);
    return (
      <Box gap={'vxl'}>
        <Box gap={'vl'}>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Packages
            </Text>
            <Pills label="MTN Bronze Merchant" pillType="packages" />
            <Pills label="MTN Silver Merchant" pillType="packages" />
            <Pills label="MTN Gold Merchant" pillType="packages" />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const Alerts: StoryObj<typeof PillsMeta> = {
  render: args => {
    const [checked, setchecked] = useState(false);
    return (
      <Box gap={'vxl'}>
        <Box gap={'vl'}>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Alerts - Large
            </Text>
            <Pills
              size="large"
              alertColor="#5CB85C"
              label="Active"
              pillType="alerts"
            />
            <Pills
              size="large"
              alertColor="#FF9400"
              label="InActive"
              pillType="alerts"
            />
            <Pills
              size="large"
              alertColor="#FF9400"
              label="Dormant"
              pillType="alerts"
            />
            <Pills
              size="large"
              alertColor="#FF9400"
              label="Passive"
              pillType="alerts"
            />
            <Pills
              size="large"
              alertColor="#C2334D"
              label="Suspended"
              pillType="alerts"
            />
            <Pills
              size="large"
              alertColor="#C2334D"
              label="Blocked"
              pillType="alerts"
            />
          </Box>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Alerts - Medium
            </Text>
            <Pills
              size="medium"
              alertColor="#5CB85C"
              label="Active"
              pillType="alerts"
            />
            <Pills
              size="medium"
              alertColor="#FF9400"
              label="InActive"
              pillType="alerts"
            />
            <Pills
              size="medium"
              alertColor="#FF9400"
              label="Dormant"
              pillType="alerts"
            />
            <Pills
              size="medium"
              alertColor="#FF9400"
              label="Passive"
              pillType="alerts"
            />
            <Pills
              size="medium"
              alertColor="#C2334D"
              label="Suspended"
              pillType="alerts"
            />
            <Pills
              size="medium"
              alertColor="#C2334D"
              label="Blocked"
              pillType="alerts"
            />
          </Box>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Alerts - Small
            </Text>
            <Pills
              size="small"
              alertColor="#5CB85C"
              label="Active"
              pillType="alerts"
            />
            <Pills
              size="small"
              alertColor="#FF9400"
              label="InActive"
              pillType="alerts"
            />
            <Pills
              size="small"
              alertColor="#FF9400"
              label="Dormant"
              pillType="alerts"
            />
            <Pills
              size="small"
              alertColor="#FF9400"
              label="Passive"
              pillType="alerts"
            />
            <Pills
              size="small"
              alertColor="#C2334D"
              label="Suspended"
              pillType="alerts"
            />
            <Pills
              size="small"
              alertColor="#C2334D"
              label="Blocked"
              pillType="alerts"
            />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const Instructions: StoryObj<typeof PillsMeta> = {
  render: args => {
    const [checked, setchecked] = useState(false);
    return (
      <Box gap={'vxl'}>
        <Box gap={'vl'}>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Instructions
            </Text>
            <Pills label="Closed" pillType="instructions" />
            <Pills label="Open" pillType="instructions" />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const Input: StoryObj<typeof PillsMeta> = {
  render: args => {
    return (
      <Box gap={'vxl'}>
        <Box gap={'vl'}>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Input
            </Text>
            <Pills label="Text" pillType="filter" />
            <Pills label="Text" pillType="filter" />
            <Pills label="Text" pillType="filter" />
            <Pills outline label="Text" pillType="filter" />
            <Pills outline cancel label="Text" pillType="filter" />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const Filter: StoryObj<typeof PillsMeta> = {
  render: args => {
    const [checked, setchecked] = useState(false);
    return (
      <Box gap={'vxl'}>
        <Box gap={'vl'}>
          <Box gap={'vm'}>
            <Text textAlign={'center'} color={'black'} variant={'headings'}>
              Filter
            </Text>
            <Pills label="Filter 1" pillType="input" />
            <Pills label="Filter 2" pillType="input" />
            <Pills label="Filter 3" pillType="input" />
            <Pills outline label="Filter 1" pillType="input" />
            <Pills outline label="Filter 2" pillType="input" />
            <Pills outline label="Filter 3" pillType="input" />
          </Box>
        </Box>
      </Box>
    );
  },
};

export default PillsMeta;
