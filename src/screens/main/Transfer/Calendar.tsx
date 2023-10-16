import React, {forwardRef, useState} from 'react';

type Props = {};

import TouchableOpacity from '@/component/atom/TouchableOpacity';
import icon from '@/constants/icon';
import {getFontSizeByWindowWidth} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {Box, Text} from '@atom';
import {useTheme} from '@shopify/restyle';
import dayjs from 'dayjs';
import {Platform, StyleSheet} from 'react-native';
import {Calendar, CalendarUtils, DateData} from 'react-native-calendars';

type calendarType = {
  onItemPress: any;
  selected: any;
};
const Calendars = forwardRef(({onItemPress, selected}: calendarType, ref) => {
  const {colors, spacing} = useTheme<Theme>();
  const {
    CalendarRightIcon,
    CalendarLeftIcon,
    DropdownIcon,
    CalendardropdownIcon,
  } = icon;
  const todayDate = new Date();
  const [selectedDate, setSelectedDate] = useState<any>(selected);
  const currentDate = dayjs().format(`YYYY-MM-DD`);
  const [showYear, setShowYear] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [current, setCurrent] = useState(dayjs());

  const getDate = (count: number) => {
    const date = new Date(todayDate);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const _renderArrow = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      return (
        <CalendarLeftIcon
          width={getFontSizeByWindowWidth(7.58)}
          height={getFontSizeByWindowWidth(13.58)}
          color={colors.black}
        />
      );
    } else {
      return (
        <CalendarRightIcon
          width={getFontSizeByWindowWidth(7.58)}
          height={getFontSizeByWindowWidth(13.58)}
          color={colors.black}
        />
      );
    }
  };

  const handlePrevMonth = () =>
    setCurrent(prev => dayjs(prev.format('YYYY-MM-DD')).subtract(1, 'month'));

  const handleNextMonth = () =>
    setCurrent(prev => dayjs(prev.format('YYYY-MM-DD')).add(1, 'month'));

  const onDateChange = (selectedDate: DateData) => {
    // console.log(selectedDate.dateString);
    // console.log('item', dayjs('2018-08-08').format(`YYYY/MM/DD`));
    // console.log('item', dayjs(selectedDate.timestamp).format(`YYYY/MM/DD`));
    const currentDate = selectedDate.dateString || todayDate.toDateString();
    // console.log('currentDate', currentDate);
    setSelectedDate(currentDate);
    onItemPress(selectedDate.dateString);

    // handleDateChange(currentDate)
    setShowYear(false);
  };

  const month = [
    {month: 'Jan', value: 1},
    {month: 'Feb', value: 2},
    {month: 'Mar', value: 3},
    {month: 'Apr', value: 4},
    {month: 'May', value: 5},
    {month: 'Jun', value: 6},
    {month: 'July', value: 7},
    {month: 'Aug', value: 8},
    {month: 'Sep', value: 9},
    {month: 'Oct', value: 10},
    {month: 'Nov', value: 11},
    {month: 'Dec', value: 12},
  ];
  const HeaderTitle = (
    <TouchableOpacity
      onPress={() => {
        setShowMonth(v => !v);
      }}
      flexDirection={'row'}
      alignItems={'center'}
      py={'vsm'}>
      <Text
        fontSize={getFontSizeByWindowWidth(15)}
        fontFamily="MTNBrighterSans-Medium"
        color={'black'}>
        {current.format('MMMM YYYY')}
      </Text>

      <CalendardropdownIcon
        width={getFontSizeByWindowWidth(11.79)}
        height={getFontSizeByWindowWidth(11.79)}
        fill={'red'}
      />
    </TouchableOpacity>
  );
  const renderCalendarWithSelectableDate = () => {
    return (
      <>
        <Calendar
          enableSwipeMonths={true}
          key={current.format('YYYY-MM-DD')}
          current={current.format('YYYY-MM-DD')}
          onPressArrowLeft={handlePrevMonth}
          onPressArrowRight={handleNextMonth}
          renderArrow={_renderArrow}
          style={styles.calendar}
          customHeaderTitle={HeaderTitle}
          markingType={'custom'}
          // dayComponent={() => <Text></Text>}
          theme={{
            arrowColor: '#797B86',
            // textDisabledColor: 'red',
            // @ts-ignore
            'stylesheet.calendar.header': {
              header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 5,
                paddingRight: 5,
                //   marginTop: 6,
                alignItems: 'center',
                // justifyContent: 'center',r
              },
              partialHeader: {
                paddingHorizontal: 15,
              },
              headerContainer: {
                flexDirection: 'row',
              },
              monthText: {
                fontSize: 14,
                fontFamily: 'MTNBrighterSans-Bold',
                margin: 10,
              },
              arrow: {
                padding: 10,
              },

              disabledArrowImage: {},
              week: {
                marginTop: 7,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
              partialWeek: {
                paddingRight: 0,
              },
              dayHeader: {
                marginTop: 2,
                marginBottom: 7,
                width: 32,
                textAlign: 'center',
                fontFamily: 'MTNBrighterSans-Medium',
                color: '#797B86',
                fontSize: 11,
              },
              disabledDayHeader: {},
            },
            'stylesheet.day.basic': {
              container: {
                alignSelf: 'stretch',
                alignItems: 'center',
                backgroundColor: 'red',
              },
              base: {
                width: 34,
                height: 34,
                alignItems: 'center',
                justifyContent: 'center',
              },
              text: {
                marginTop: 6,
                // marginTop: constants.isAndroid ? 4 : 6,
                fontSize: 14,
                color: '#45454A',
                fontFamily: 'MTNBrighterSans-Regular',
              },
              alignedText: {},
              selected: {},
              today: {},
              selectedDot: {},
            },
            'stylesheet.day.main': {
              week: {
                width: '100%',
                // width: 547,
                flexDirection: 'row',
                // justifyContent: 'center',
                justifyContent: 'space-around',
                // marginVertical: 4
              },
              container: {
                width: '100%',
                backgroundColor: colors.primaryColor,
                // width: 547,r
              },
              dayContainer: {},
              emptyDayContainer: {
                flex: 1,
              },
              monthView: {},
            },
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: colors.momoBlue,
              //   marked: true,
              // disableTouchEvent: true,
              customStyles: {
                container: {
                  borderRadius: 5,
                  // height: 38
                },
                text: {
                  fontFamily: 'MTNBrighterSans-Medium',
                },
              },
            },
            [currentDate]: {
              selected: true,
              selectedColor: colors.extraLightGrey,
              customStyles: {
                container: {
                  borderRadius: 5,
                  // height: 38
                },
                text: {
                  fontFamily: 'MTNBrighterSans-Medium',
                  color: 'black',
                },
              },
            },
          }}
          maxDate={todayDate.toDateString()}
          onDayPress={date => {
            onDateChange(date);
            console.log('date', date);
          }}
        />
      </>
    );
  };
  const handleMonthPress = (item: (typeof month)[0]) => {
    const currentDate = dayjs(current);
    const year = currentDate.year();
    const day = currentDate.date();

    const modifiedDate = dayjs(`${year}-${item.value}-${day}`, {
      format: 'YYYY-M-D',
    });
    setCurrent(modifiedDate);
    setShowMonth(false);
  };
  return (
    <Box ref={ref}>
      {/* <Text>Calendar</Text> */}
      {renderCalendarWithSelectableDate()}
      <Box
        style={{
          position: 'absolute',
          justifyContent: 'center',
          flexDirection: 'row',
          top: 40,
          left: 0,
          right: 0,
        }}>
        {showMonth && (
          <Box
            style={{
              elevation: 14,
              shadowColor: Platform.select({
                ios: 'lightGrey', //878787  9b9b9b
                android: 'shadow', // 5b5b5b 4f4f4f
              }),
              shadowOffset: {
                width: 1,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              paddingBottom: 0,
            }}
            bg={'white'}
            // bg={'red100'}
            width={'50%'}
            p={'hsm'}
            borderRadius={9}
            flexDirection={'row'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            gap={'hm'}
            // borderWidth={1}
            alignItems={'center'}>
            {/* <FlatList
              data={month}
              renderItem={({item}) => {
                const mnt = dayjs(current).month() + 1;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      const currentDate = dayjs(current);

                      // Get the year and day from the current date
                      const year = currentDate.year();
                      const day = currentDate.date();

                      // Create a new date with the desired month and the same year and day
                      const modifiedDate = dayjs(
                        `${year}-${item.value}-${day}`,
                        {
                          format: 'YYYY-M-D',
                        },
                      );
                      setCurrent(prev => modifiedDate);
                      setShowMonth(false);
                    }}
                    height={22}
                    width={38}
                    // justifyContent={'flex-end'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    style={{
                      marginBottom: 10,
                      // flex:1
                      backgroundColor:
                        mnt === item.value ? colors.momoBlue : 'white',
                    }}>
                    <Text
                      fontFamily="MTNBrighterSans-Regular"
                      fontSize={10}
                      // textAlign={'justify'}
                      style={{
                        color: mnt === item.value ? 'white' : 'black',
                        // flex: 1,
                      }}
                      color={'black'}>
                      {item.month}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.month}
              numColumns={3} // Set the number of columns to 3
              columnWrapperStyle={{
                justifyContent: 'space-between',
                gap: 10,
              }}
            /> */}
            <Box
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {month.map(item => {
                const mnt = dayjs(current).month() + 1;
                return (
                  <TouchableOpacity
                    key={item.month}
                    onPress={() => {
                      handleMonthPress(item);
                    }}
                    style={{
                      height: 22,
                      width: 38,
                      marginBottom: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor:
                        mnt === item.value ? colors.momoBlue : 'white',
                    }}>
                    <Text
                      fontFamily="MTNBrighterSans-Regular"
                      fontSize={10}
                      style={{
                        color: mnt === item.value ? 'white' : 'black',
                      }}>
                      {item.month}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
});

const styles = StyleSheet.create({
  calendar: {
    height: 'auto',
    backgroundColor: '#fff',
    margin: 0,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    padding: 0,
    overflow: 'hidden',
  },
});
export default Calendars;
