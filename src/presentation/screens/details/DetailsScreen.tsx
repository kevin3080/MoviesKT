import { Text } from 'react-native';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/Navigation';
import useMovie from '../../hooks/useMovie';
import MovieHeader from '../../components/movie/MovieHeader';
import MovieDetails from '../../components/movie/MovieDetails';
import { ScrollView } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

const DetailsScreen = ({ route }: Props) => {
  //const { movieId } = useRoute().params;
  const { movieId } = route.params;
  const { isloading, movie, getCast = [] } = useMovie(movieId);

  if (isloading) {
    return <Text>cargando...</Text>;
  }
  return (
    <ScrollView>
      {/* Headers */}
      <MovieHeader
        poster={movie!.poster}
        title={movie!.title}
        originalTitle={movie!.originalTitle}
      />

      {/* Details */}
      <MovieDetails movie={movie!} cast={getCast} />
    </ScrollView>
  );
};

export default DetailsScreen;
