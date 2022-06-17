import { Fabrica } from "./fabrica";
import { Nivel_Usuario } from "./nivel_usuario";


export class Usuario{
    constructor(
        public id:number,
        public activo:boolean,
        public nombre:string,
        public apellido:string,
        public telefono:string,
        public usuario:string,
        public password:string,
        public fabrica:Fabrica,
        public nivelUsuario:Nivel_Usuario,
    ){}
}