import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class ColorService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'colores/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(color:any):Observable<any>{
        return this._http.post(this.url,color)
    }
    getIdColor(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombreColor(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarColor(id:any,color:any):Observable<any>{
        return this._http.get(this.url+id,color)
    }
}