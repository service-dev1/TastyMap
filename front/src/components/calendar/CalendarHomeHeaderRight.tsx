import React from 'react';
import HeaderButton from '../common/HeaderButton';

function CalendarHomeHeaderRight(onPress: () => void) {
  return <HeaderButton onPress={onPress} labelText="오늘" />;
}

export default CalendarHomeHeaderRight;
