import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PelisPopularesResponse } from './interfaces/peliculas-populares-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Cinemango } from 'src/cinemango/entities/cinemango.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
      @InjectModel(Cinemango.name)
      private readonly cinemangoModel: Model<Cinemango>
  ) {}

  async executeSeed() {
    await this.cinemangoModel.deleteMany({});

    const { data } = await this.axios.get<PelisPopularesResponse>('https://api.themoviedb.org/3/movie/popular?language=es-ES', {
      headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      accept: 'application/json'
      }
    });

    const pelisPopularesToInsert: { nro: number, titulo: string, sinopsis: string, poster: string, lanzamiento: string, numeroVotos: number, promedioVotos: number } [] = [];

    data.results.forEach( async ({ id, title, overview, poster_path, release_date, vote_count, vote_average }) => {
      
      const nro = id;
      const titulo = title;
      const sinopsis = overview;
      const poster = poster_path;
      const lanzamiento = release_date;
      const numeroVotos = vote_count;
      const promedioVotos = vote_average;

      pelisPopularesToInsert.push({ nro, titulo, sinopsis, poster, lanzamiento, numeroVotos, promedioVotos })

    });

    await this.cinemangoModel.insertMany(pelisPopularesToInsert);

    return 'Seed ejecutado correctamente';
    }

}