import { useEffect, useState } from 'react';
import { FullMovie } from '../../core/models/movie.model';
import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { Cast } from '../../core/models/cast.models';

export default function useMovie(movieId: number) {
  const [isloading, setIsloading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [getCast, setGetCast] = useState<Cast[]>();

  useEffect(() => {
    const loadMovie = async () => {
      setIsloading(true);
      const fullMoviePromise = UseCases.getMovieByIdUseCase(
        movieDBFetcher,
        movieId,
      );
      const castPromise = UseCases.getMovieCastUseCase(movieDBFetcher, movieId);
      const [fullMovie, cast] = await Promise.all([
        fullMoviePromise,
        castPromise,
      ]);
      setGetCast(cast);
      setMovie(fullMovie);
      setIsloading(false);
    };

    loadMovie();
  }, [movieId]);
  console.log(movie);
  return {
    isloading,
    movie,
    getCast,
  };
}
