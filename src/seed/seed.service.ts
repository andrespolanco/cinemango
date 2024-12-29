import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PelisPopularesResponse } from './interfaces/peliculas-populares-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<PelisPopularesResponse>('https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1', {
      headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWY5ZjE0MTMxZmQ0Mzk1NGRlNDA0NmM1OWNjMTI5OSIsIm5iZiI6MTYxMzY4OTE5OC41MDcsInN1YiI6IjYwMmVmMTZlZWZlMzdjMDA0MWJjN2IxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tcW6RBPcxtXgn5NppqhUgPUWb2MJffGzy3BXDY721jg`
      }
    });
    data.results.forEach(({ id, title, overview, poster_path, release_date, vote_count, vote_average }) => {
      const nro = id;
      const titulo = title;
      const sinopsis = overview;
      const poster = poster_path;
      const lanzamiento = release_date;
      const numeroVotos = vote_count;
      const promedioVotos = vote_average;

      console.log({ nro, titulo, sinopsis, poster, lanzamiento, numeroVotos, promedioVotos });
    });

    return data.results;
    }

}