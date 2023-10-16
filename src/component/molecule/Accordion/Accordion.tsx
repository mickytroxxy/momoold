import React, {useState} from 'react';
import {Box, Text} from '@atom';
import CustomAccordion from 'react-native-collapsible/Accordion';
import {accordionData} from '@/fixtures/dummyData';
import {useTheme} from '@shopify/restyle';
import {Theme} from '@/typings/globalTheme';
import icon from '@/constants/icon';
import { moderateScale } from 'react-native-size-matters';
import { getFontSizeByWindowWidth } from '@/style/theme';
import HorizontalCardSeparator from '../Card/HorizontalCardSeparator';
import { View } from 'react-native';

type AccordionDataProps = {
  propData:{
    id: number,
    title: string,
    content?:string,
    renderScene?: () => JSX.Element;
  }[]
}
const Accordion = (props:AccordionDataProps) => {
  const {propData} = props;
  const [activeSections, setactiveSections] = useState([]);
  const {colors, spacing} = useTheme<Theme>();
  const {DropIcon, UpIcon} = icon;
  const renderHeaders = (content: any, index: any, isActive: boolean) => {
    return (
      <Box
        style={{
          flexDirection: 'row',
          paddingVertical: getFontSizeByWindowWidth(12.5),
          justifyContent: 'space-between',
          paddingHorizontal: getFontSizeByWindowWidth(24),
          backgroundColor: colors.white,
          alignItems: 'center',
          borderTopWidth: index === 0 ? 0 : 1,
          borderColor: '#0000001A',
        }}>
        <Text
          style={{
            fontSize: getFontSizeByWindowWidth(12),
            lineHeight: getFontSizeByWindowWidth(18),
            color: colors.momoBlue,
            fontFamily: 'MTNBrighterSans-Bold',
          }}>
          {content.title}
        </Text>
        {isActive ? (
          <UpIcon width={14} height={14} color={colors.momoBlue} />
        ) : (
          <DropIcon width={14} height={14} color={colors.momoBlue} />
        )}
      </Box>
    );
  };
  const renderContent = (section: any) => {
    return (
      <Box
        style={{
          paddingHorizontal: getFontSizeByWindowWidth(0),
          paddingTop: getFontSizeByWindowWidth(10),
          paddingBottom: getFontSizeByWindowWidth(20),
          marginTop:-20
          // paddingRight: getFontSizeByWindowWidth(50),
        }}>
        {section.renderScene()}
      </Box>
    );
  };

  const updateSections = (activeSections: any) => {
    setactiveSections(activeSections);
  };

  return (
    <Box>
      {/* <Text>Accordion</Text> */}
      <CustomAccordion
        sections={propData?.length > 0 ? propData : accordionData}
        activeSections={activeSections}
        // renderSectionTitle={renderSectionTitle}
        renderHeader={renderHeaders}
        renderContent={renderContent}
        onChange={updateSections}
        underlayColor={'transparent'}
        // customIcon={() => <ChevronDownIcon />}
      />
      <View style={{paddingLeft:24,paddingRight:24}}><HorizontalCardSeparator/></View>
    </Box>
  );
};

export default Accordion;
