import { View, Text } from 'react-native';
import React from 'react';
import { FullMovie } from '../../../core/models/movie.model';
import { Formatter } from '../../../config/helpers/formatter';
import { Cast } from '../../../core/models/cast.models';
import { FlatList } from 'react-native-gesture-handler';
import CastActor from '../cast/CastActor';

interface Props {
  movie: FullMovie;
  cast: Cast[];
}

export default function MovieDetails({ movie, cast }: Props) {
  return (
    <>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'grey' }}>{movie.rating}</Text>

          <Text style={{ color: 'grey' }}>- {movie.genres.join(', ')}</Text>
        </View>
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 23,
              marginTop: 10,
              fontWeight: 'bold',
            }}>
            Historia
          </Text>
          <Text style={{ color: 'black', marginBottom: 10 }}>
            {movie.description}
          </Text>
          <View
            style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 16, color: 'black', marginBottom: 5 }}>
              Presupuesto: {Formatter.currency(movie.budget)}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              color: 'black',
              fontSize: 23,
              marginVertical: 10,
              fontWeight: 'bold',
              marginHorizontal: 20,
            }}>
            Actores
          </Text>

          <FlatList
            data={cast}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <CastActor actor={item} />}
          />
        </View>
      </View>
    </>
  );
}
