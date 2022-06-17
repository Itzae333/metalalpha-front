import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class PinturaService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'pinturas/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(pintura:any):Observable<any>{
        return this._http.post(this.url,pintura)
    }
    getIdPintura(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombrePintura(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarPintura(id:any,pintura:any):Observable<any>{
        return this._http.get(this.url+id,pintura)
    }
}