import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model } from 'mongoose';
import { Cinemango } from './entities/cinemango.entity';
import { InjectModel } from '@nestjs/mongoose';

import { CreateCinemangoDto } from './dto/create-cinemango.dto';
import { UpdateCinemangoDto } from './dto/update-cinemango.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class CinemangoService {

  constructor(
    @InjectModel(Cinemango.name)
    private readonly cinemangoModel: Model<Cinemango>
  ) {}

  async create(createCinemangoDto: CreateCinemangoDto) {
    try {
      await this.cinemangoModel.syncIndexes();
      const cinemango = await this.cinemangoModel.create(createCinemangoDto);
      return cinemango;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(paginationDto: PaginationDto){
    const { limit=10, page=1 } = paginationDto;
    return this.cinemangoModel.find()
    .limit(limit)
    .skip(page)
    .sort({ lanzamiento: 'desc' })
    .select('-__v');
  }

  async findOne(id: string) {
    let cinemango: Cinemango;

    //busqueda por nro
    if(!isNaN(Number(id))){
      cinemango = await this.cinemangoModel.findOne({nro: id}).select('-__v');
    }

    //busqueda por mongoid
    if (!cinemango && isValidObjectId(id)) {
      cinemango = await this.cinemangoModel.findById(id).select('-__v');
    }

    //busqueda por titulo
    if (!cinemango) {
      cinemango = await this.cinemangoModel.findOne({titulo: id.trim()});
    }

    //si el id no existe
    if(!cinemango){
      throw new NotFoundException(`La pelicula con el id ${id} no existe`);
    }

    return cinemango;
  }

  async update(id: string, updateCinemangoDto: UpdateCinemangoDto) {
    const cinemango = await this.findOne(id);
    try {
      await cinemango.updateOne(updateCinemangoDto);
      return { ...cinemango.toJSON(), ...updateCinemangoDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    //forma con 2 llamados a la bd
    //const cinemango = await this.findOne(id);
    //await cinemango.deleteOne();

    //forma con 1 llamado a la bd
    const {deletedCount} = await this.cinemangoModel.deleteOne({ _id: id });
    if (deletedCount === 0) 
      throw new NotFoundException(`La pelicula con el id ${id} no existe`);
    return;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`${ JSON.stringify(error.keyValue) } es un duplicado`);
    }
    console.log(error);
    throw new InternalServerErrorException('Error al crear la pelicula de cinemango');
  }
}
