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
    getNombreCarrito(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarCarrito(id:any,carrito:any):Observable<any>{
        return this._http.put(this.url+id,carrito)
    }
}