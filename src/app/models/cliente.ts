import { Tipo_Cuenta } from "./tipo_cuenta";

export class Cliente{
    constructor(
        public id:number,
        public activo:boolean,
        public nombre:string,
        public apellido:string,
        public correo:string,
        public telefono:string,
        public tipoCuenta:Tipo_Cuenta,
    ){}
}