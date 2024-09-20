import { View, Text, StatusBar } from 'react-native';
import React from 'react';
import { useMovies } from '../../hooks/useMovies';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PosterCarousel from '../../components/movies/PosterCarousel';
import HorizontalCarousel from '../../components/movies/HorizontalCarousel';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { moviesData, nextPage } = useMovies();
  const { nowPlaying, upcoming, topRated, popular, isLoading } = moviesData;

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <ScrollView>
      <View style={{ marginTop: top + 15, paddingBottom: 30 }}>
        <StatusBar
          barStyle={`light-content`}
          backgroundColor="transparent"
          translucent
        />

        {/* main */}
        <PosterCarousel movies={nowPlaying} />

        {/* popular */}

        <HorizontalCarousel
          movies={popular}
          title="Puplares"
          loadNextPage={() => nextPage('popular')}
        />
        {/* Top Rated */}

        <HorizontalCarousel
          movies={topRated}
          title="Top Rated"
          loadNextPage={() => nextPage('topRated')}
        />
        {/* Upcoming */}

        <HorizontalCarousel movies={upcoming} title="Upcoming" />
      </View>
    </ScrollView>
  );
};
export default HomeScreen;
