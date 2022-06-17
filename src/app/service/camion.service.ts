import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class CamionService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'camiones/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(camion:any):Observable<any>{
        return this._http.post(this.url,camion)
    }
    getIdCamion(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombreCamion(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarCamion(id:any,camion:any):Observable<any>{
        return this._http.get(this.url+id,camion)
    }
}