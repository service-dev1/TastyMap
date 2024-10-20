import {colors} from '@/constants';
import useModal from '@/hooks/useModal';
import {isSameAsCurrentDate, MonthYear} from '@/utils';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Pressable, Text, View, FlatList, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CalendarHomeHeaderRight from './CalendarHomeHeaderRight';
import DateBox from './DateBox';
import DayofWeeks from './DayofWeeks';
import YearSelector from './YearSelector';

interface CalendarProps<T> {
  monthYear: MonthYear;
  selectedDate: number;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
  schedules: Record<number, T>;
  moveToToday: () => void;
}

function Calendar<T>({
  monthYear,
  onChangeMonth,
  selectedDate,
  onPressDate,
  schedules,
  moveToToday,
}: CalendarProps<T>) {
  const {month, year, lastDate, firstDOW} = monthYear;
  const navigation = useNavigation();
  const yearSelector = useModal();

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => CalendarHomeHeaderRight(moveToToday),
    });
  }, [moveToToday, navigation]);

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable onPress={() => onChangeMonth(-1)}>
          <Ionicons
            name="arrow-back"
            size={25}
            color={colors.BLACK}
            style={styles.monthButtonContainer}
          />
        </Pressable>
        <Pressable
          style={styles.monthYearContainer}
          onPress={yearSelector.show}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.GRAY_500}
          />
        </Pressable>
        <Pressable onPress={() => onChangeMonth(1)}>
          <Ionicons
            name="arrow-forward"
            size={25}
            color={colors.BLACK}
            style={styles.monthButtonContainer}
          />
        </Pressable>
      </View>

      <DayofWeeks />

      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
            id: i,
            date: i - firstDOW + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              isToday={isSameAsCurrentDate(year, month, item.date)}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
              date={item.date}
              hasSchedule={Boolean(schedules[item.date])}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>

      <YearSelector
        isVisible={yearSelector.isVisible}
        hide={yearSelector.hide}
        currentYear={year}
        onChangeYear={handleChangeYear}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthButtonContainer: {
    padding: 10,
  },
  monthYearContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_300,
    backgroundColor: colors.GRAY_100,
  },
});

export default Calendar;
