import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class ClienteService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'clientes/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(cliente:any):Observable<any>{
        return this._http.post(this.url,cliente)
    }
    getIdCliente(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombreCliente(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarCliente(id:any,cliente:any):Observable<any>{
        return this._http.get(this.url+id,cliente)
    }
}