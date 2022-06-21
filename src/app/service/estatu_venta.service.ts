import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class EstatusVentaService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'estatus-ventas/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(estatusVenta:any):Observable<any>{
        return this._http.post(this.url,estatusVenta)
    }
    getIdEstatusVenta(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombreEstatusVenta(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarEstatusVenta(id:any,estatusVenta:any):Observable<any>{
        return this._http.put(this.url+id,estatusVenta)
    }
}