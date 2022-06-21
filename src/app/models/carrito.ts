import { Inventario } from "./inventario";
import { Venta } from "./venta";



export class Carrito{
    constructor(
        public id:number,
        public activo:boolean,
        public cantidad:number,
        public inventario:Inventario,
        public venta:Venta,
    ){}
}