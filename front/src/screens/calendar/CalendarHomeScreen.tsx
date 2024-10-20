import Calendar from '@/components/calendar/Calendar';
import EventList from '@/components/calendar/EventList';
import {colors} from '@/constants';
import useGetCalendarPost from '@/hooks/queries/useGetCalendarPost';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);

  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPost(monthYear.year, monthYear.month);

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    moveToToday();
  }, []);

  if (isPending || isError) {
    return <></>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        schedules={posts}
        monthYear={monthYear}
        selectedDate={selectedDate}
        onChangeMonth={handleUpdateMonth}
        onPressDate={handlePressDate}
        moveToToday={moveToToday}
      />
      <EventList posts={posts[selectedDate]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default CalendarHomeScreen;
