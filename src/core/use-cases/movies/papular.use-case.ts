import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { PopularResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import { Movie } from '../../models/movie.model';

interface Options {
  page?: number;
  limit?: number;
}

export const moviesPopularUseCase = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const popular = await fetcher.get<PopularResponse>('/popular', {
      params: {
        page: options?.page ?? 1,
      },
    });
    return popular.results.map(MovieMapper.fromMovieDBResultToModel);
  } catch (error: any) {
    throw new Error('Error fetching movies - popular' + error.message);
  }
};
