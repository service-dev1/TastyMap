import React, {useState} from 'react';
import {ImageUri} from '@/types';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  StyleSheet,
} from 'react-native';
import {View} from 'react-native';
import {Dimensions} from 'react-native';
import {colors} from '@/constants';
import Octicons from 'react-native-vector-icons/Octicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

function ImageCarousel({images, pressedIndex = 0}: ImageCarouselProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [page, setPage] = useState(pressedIndex);
  const [initialIndex, setInitialIndex] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);

    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.backButton, {marginTop: insets.top + 10}]}
        onPress={() => navigation.goBack()}>
        <Octicons name="arrow-left" size={30} color={colors.WHITE} />
      </Pressable>

      <FlatList
        keyExtractor={item => String(item.id)}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(0);
        }}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
        onScroll={handleScroll}
        renderItem={({item}) => (
          <View style={{width: deviceWidth}}>
            <Image
              style={styles.image}
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030/'
                    : 'http://10.0.2.2:3030/'
                }${item.uri}`,
              }}
              resizeMode="contain"
            />
          </View>
        )}
      />

      <View style={[styles.pageContainer, {bottom: insets.bottom + 10}]}>
        {Array.from({length: images.length}, (_, index) => (
          <View
            key={index}
            style={[
              styles.pageDot,
              index === page && styles.currentPageDot,
            ]}></View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    backgroundColor: colors.PINK_700,
    height: 40,
    width: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  pageDot: {
    margin: 4,
    backgroundColor: colors.GRAY_200,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  currentPageDot: {
    backgroundColor: colors.PINK_700,
  },
});

export default ImageCarousel;
