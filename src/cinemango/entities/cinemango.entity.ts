import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Cinemango extends Document{
    @Prop({unique: true, index: true})
    nro: number;
    @Prop({unique: true, index: true})
    titulo: string;
    @Prop()
    sinopsis: string;
    @Prop()
    poster: string;
    @Prop()
    lanzamiento: string;
    @Prop()
    numeroVotos: number;
    @Prop()
    promedioVotos: number;
}

export const CinemangoSchema = SchemaFactory.createForClass(Cinemango);