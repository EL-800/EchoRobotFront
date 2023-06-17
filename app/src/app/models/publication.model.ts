import { Comment } from "./comment.model";

export interface Publication{
    idPublicacion : number;
    titulo : string;
    nombre : string;
    apellido : string
    foto : string;
    fecha : Date;
    descripcion : string,
    multimedia : string[],
    comentarios : Comment[],
    idAutor :number
}