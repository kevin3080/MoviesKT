import { useEffect, useState } from 'react';
import { Movie } from '../../core/models/movie.model';
import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';

type MovieCategory = 'nowPlaying' | 'upcoming' | 'topRated' | 'popular';

interface MoviesState {
  nowPlaying: Movie[];
  upcoming: Movie[];
  topRated: Movie[];
  popular: Movie[];
  isLoading: boolean;
  error: string | null;
}

export const useMovies = () => {
  const [moviesData, setMoviesData] = useState<MoviesState>({
    nowPlaying: [],
    upcoming: [],
    topRated: [],
    popular: [],
    isLoading: true,
    error: null,
  });

  const [pageNumbers, setPageNumbers] = useState<Record<MovieCategory, number>>(
    {
      nowPlaying: 1,
      upcoming: 1,
      topRated: 1,
      popular: 1,
    },
  );

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

  const fetchMovies = async (category: string, pageNumber: number) => {
    try {
      let fetchMoviesFunction;
      switch (category) {
        case 'nowPlaying':
          fetchMoviesFunction = UseCases.moviesNowPlayingUseCase;
          break;
        case 'upcoming':
          fetchMoviesFunction = UseCases.moviesUpcomingUseCase;
          break;
        case 'topRated':
          fetchMoviesFunction = UseCases.moviesTopRatedUseCase;
          break;
        case 'popular':
          fetchMoviesFunction = UseCases.moviesPopularUseCase;
          break;
        default:
          throw new Error('Unknown category');
      }
      const movies = await fetchMoviesFunction(movieDBFetcher, {
        page: pageNumber,
      });
      setMoviesData(prevState => ({
        ...prevState,
        [category]: [...prevState[category], ...movies],
      }));
    } catch (error) {
      setMoviesData(prevState => ({
        ...prevState,
        isLoading: false,
        error: (error as Error).message,
      }));
    }
  };

  const nextPage = (category: MovieCategory) => {
    setPageNumbers(prevState => {
      const newPageNumber = prevState[category] + 1;
      fetchMovies(category, newPageNumber);

      return {
        ...prevState,
        [category]: newPageNumber,
      };
    });

    fetchMovies(category, pageNumbers[category] + 1);
  };

  return {
    moviesData,
    nextPage,
  };
};
