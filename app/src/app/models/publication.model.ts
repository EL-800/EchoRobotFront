export interface Publication{
    idPublicacion : number;
    autor : string;
    foto : string;
    fecha : Date;
    descripcion : string,
    multimedia : string[],
    comentarios : Comment[]
}