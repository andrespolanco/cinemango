import { IsInt, IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateCinemangoDto {
    @IsInt()
    @IsPositive()
    @Min(1)
    nro: number;

    @IsString()
    @MinLength(1)
    titulo: string;

    @IsString()
    @MinLength(1)
    sinopsis: string;

    @IsString()
    @MinLength(1)
    poster: string;

    @IsString()
    @MinLength(1)
    lanzamiento: string;

    @IsInt()
    @IsPositive()
    @Min(1)
    numeroVotos: number;

    @IsNumber()
    @IsPositive()
    @Min(1)
    promedioVotos: number;
}
