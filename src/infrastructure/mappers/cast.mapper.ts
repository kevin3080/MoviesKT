import { Cast } from '../../core/models/cast.models';
import { MovieDBCast } from '../interfaces/movie-db.responses';

export const CastMapper = {
  fromMovieDBCastToModel(cast: MovieDBCast): Cast {
    return {
      id: cast.id,
      name: cast.name,
      character: cast.character ?? 'No Character',
      avatar: cast.profile_path
        ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
        : `https://i.stack.imgur.com/l60Hf.png`,
    };
  },
};
