import { Fabrica } from "./fabrica";
import { Pintura } from "./pintura";

export class Producto{
    constructor(
        public id:number,
        public nombre:string,
        public medidas:string,
        public tipo:string,
        public precio_public:number,
        public precio_mayoreo:number,
        public precio_credito:number,
        public precio_creditoNo:number,
        public precio_puebla:number,
        public precio_tecamachalco:number,
        public precio_tepeaca:number,
        public activo:boolean,
        public pintura:Pintura,
        public fabrica:Fabrica
    ){}
}