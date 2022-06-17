import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class InventarioService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'inventarios/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(inventario:any):Observable<any>{
        return this._http.post(this.url,inventario)
    }
    getIdInventario(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombreInventario(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarInventario(id:any,inventario:any):Observable<any>{
        return this._http.get(this.url+id,inventario)
    }
}