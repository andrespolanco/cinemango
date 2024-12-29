import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CinemangoService } from './cinemango.service';
import { CreateCinemangoDto } from './dto/create-cinemango.dto';
import { UpdateCinemangoDto } from './dto/update-cinemango.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('cinemango')
export class CinemangoController {
  constructor(private readonly cinemangoService: CinemangoService) {}

  @Post()
  create(@Body() createCinemangoDto: CreateCinemangoDto) {
    return this.cinemangoService.create(createCinemangoDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto) {
    return this.cinemangoService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemangoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCinemangoDto: UpdateCinemangoDto) {
    return this.cinemangoService.update(id, updateCinemangoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.cinemangoService.remove(id);
  }
}