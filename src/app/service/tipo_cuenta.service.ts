import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class TipoCuentaService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'tipos-cuentas/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(tipoCuenta:any):Observable<any>{
        return this._http.post(this.url,tipoCuenta)
    }
    getIdNivelTipoCuenta(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombreTipoCuenta(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarTipoCuenta(id:any,tipoCuenta:any):Observable<any>{
        return this._http.put(this.url+id,tipoCuenta)
    }
}