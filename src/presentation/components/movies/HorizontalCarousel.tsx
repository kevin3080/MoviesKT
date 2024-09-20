import {
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Movie } from '../../../core/models/movie.model';
import { FlatList } from 'react-native-gesture-handler';
import MoviePoster from './MoviePoster';

interface Props {
  movies: Movie[];
  title?: string;
  loadNextPage?: () => void;
}

export default function HorizontalCarousel({
  movies,
  title,
  loadNextPage,
}: Props) {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 800 >= contentSize.width;
    if (!isEndReached) return;

    isLoading.current = true;
    // leading the next page
    loadNextPage && loadNextPage();
  };

  return (
    <View style={{ height: title ? 260 : 220 }}>
      {title && (
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'light',
            marginLeft: 10,
            color: 'black',
            paddingBottom: 10,
          }}>
          {title}
        </Text>
      )}

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MoviePoster movie={item} height={200} width={140} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    </View>
  );
}
