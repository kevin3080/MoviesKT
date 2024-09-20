import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDBCastResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { CastMapper } from '../../../infrastructure/mappers/cast.mapper';
import { Cast } from '../../models/cast.models';

export const getMovieCastUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<Cast[]> => {
  try {
    const { cast } = await fetcher.get<MovieDBCastResponse>(
      `/${movieId}/credits`,
    );
    const actor = cast.map(actor => CastMapper.fromMovieDBCastToModel(actor));

    return actor;
  } catch (error: any) {
    throw new Error('Error fetching cast - getMovieCast' + error.message);
  }
};
