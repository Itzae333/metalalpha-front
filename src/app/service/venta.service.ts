import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class VentaService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'ventas/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(venta:any):Observable<any>{
        return this._http.post(this.url,venta)
    }
    getIdVenta(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombreVenta(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarVenta(id:any,venta:any):Observable<any>{
        return this._http.put(this.url+id,venta)
    }
}