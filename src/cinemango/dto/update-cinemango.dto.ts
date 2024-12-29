import { PartialType } from '@nestjs/mapped-types';
import { CreateCinemangoDto } from './create-cinemango.dto';

export class UpdateCinemangoDto extends PartialType(CreateCinemangoDto) {}
