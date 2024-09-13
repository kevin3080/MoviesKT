// pattern mapper
import {Movie} from '../../core/models/movie.model';
import {Result} from '../interfaces/movie-db.responses';

export class MovieMapper {
  static fromMovieDBResultToModel(result: Result): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: result.release_date,
      reating: result.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
      backdrop: `https://image.tmdb.org/t/p/w500${result.backdrop_path}`,
    };
  }
}
