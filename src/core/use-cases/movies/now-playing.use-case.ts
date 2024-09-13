import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {GenericMovieDBResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {Movie} from '../../models/movie.model';

export const moviesNowPlayingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const nowPlaying = await fetcher.get<GenericMovieDBResponse>(
      '/now_playing',
    );
    return nowPlaying.results.map(MovieMapper.fromMovieDBResultToModel);
  } catch (error: any) {
    throw new Error('Error fetching movies - NowPlaying' + error.message);
  }
};
