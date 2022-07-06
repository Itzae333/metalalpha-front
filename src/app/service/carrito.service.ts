import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class CarritoService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'carritos/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(carrito:any):Observable<any>{
        return this._http.post(this.url,carrito)
    }
    getIdCarrito(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getVentaCarrito(venta:any):Observable<any>{
        return this._http.get(this.url+'venta/'+venta)
    }

    getVentaInventarioCarrito(id:any,idInv:any):Observable<any>{
        return this._http.get(this.url+'venta/inventario/'+id+'&'+idInv)
    }

    actualizarCarrito(id:any,carrito:any):Observable<any>{
        return this._http.put(this.url+id,carrito)
    }

    borrarProducto(id:any,idInv:any):Observable<any>{
        return this._http.delete(this.url+'venta/'+id+'&'+idInv)
    }
}