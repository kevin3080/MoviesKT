import {AxiosAdapter} from './http/axios.adapter';

export const movieDBFetcher = new AxiosAdapter({
  baseUrl: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'your api key',
    language: 'es',
  },
});
