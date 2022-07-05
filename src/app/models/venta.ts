import { Cliente } from "./cliente";
import { Estatus_Venta } from "./estatu_venta";
import { Usuario } from "./usuario";



export class Venta{
    constructor(
        public id:number,
        public activo:boolean,
        public uid_venta:string,
        public recibido:number,
        public restan:number,
        public cambio:number,
        public total:number,
        public cliente:Cliente,
        public estatusVenta:Estatus_Venta,
        public usuario:Usuario
    ){}
}