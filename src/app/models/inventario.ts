import { Color } from "./color";
import { Fabrica } from "./fabrica";
import { Producto } from "./producto";

export class Inventario{
    constructor(
        public id:number,
        public activo:boolean,
        public existencias:number,
        public producto:Producto,
        public color:Color,
        public fabrica:Fabrica,
    ){}
}