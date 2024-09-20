import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { GenericMovieDBResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { Movie } from '../../models/movie.model';

interface Options {
  page?: number;
  limit?: number;
}

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const topRated = await fetcher.get<GenericMovieDBResponse>('/top_rated', {
      params: {
        page: options?.page ?? 1,
      },
    });
    return topRated.results.map(MovieMapper.fromMovieDBResultToModel);
  } catch (error: any) {
    throw new Error('Error fetching movies - topRated' + error.message);
  }
};
