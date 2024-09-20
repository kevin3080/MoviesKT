// pattern mapper
import { FullMovie, Movie } from '../../core/models/movie.model';
import { MovieDBID, Result } from '../interfaces/movie-db.responses';

export class MovieMapper {
  static fromMovieDBResultToModel(result: Result): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: result.release_date,
      rating: result.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
    };
  }
  static fromMovieDBToFullMovie(movie: MovieDBID): FullMovie {
    return {
      genres: movie.genres.map(genre => genre.name),
      duration: movie.runtime,
      budget: movie.budget,
      originalTitle: movie.original_title,
      productionCompanies: movie.production_companies.map(
        company => company.name,
      ),
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: movie.release_date,
      rating: movie.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
    };
  }
}
