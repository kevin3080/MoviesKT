import {useEffect, useState} from 'react';
import {Movie} from '../../core/models/movie.model';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

export const useMovies = () => {
  const [moviesData, setMoviesData] = useState({
    nowPlaying: [] as Movie[],
    upcoming: [] as Movie[],
    topRated: [] as Movie[],
    popular: [] as Movie[],
    isLoading: true,
    error: null as string | null,
  });

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    try {
      const [nowPlayingMovies, upcomingMovies, topRatedMovies, popularMovies] =
        await Promise.all([
          UseCases.moviesNowPlayingUseCase(movieDBFetcher),
          UseCases.moviesUpcomingUseCase(movieDBFetcher),
          UseCases.moviesTopRatedUseCase(movieDBFetcher),
          UseCases.moviesPopularUseCase(movieDBFetcher),
        ]);

      setMoviesData({
        nowPlaying: nowPlayingMovies,
        upcoming: upcomingMovies,
        topRated: topRatedMovies,
        popular: popularMovies,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setMoviesData(prevState => ({
        ...prevState,
        isLoading: false,
        error: (error as Error).message,
      }));
    }
  };

  return moviesData;
};
