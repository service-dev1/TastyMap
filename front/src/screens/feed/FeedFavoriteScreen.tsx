import FeedFavoirtList from '@/components/feed/FeedFavoriteList';
import {colors} from '@/constants';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <FeedFavoirtList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedFavoriteScreen;
