import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class FabricaService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'fabricas/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(fabrica:any):Observable<any>{
        return this._http.post(this.url,fabrica)
    }
    getIdFabrica(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombreFabrica(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarFabrica(id:any,fabrica:any):Observable<any>{
        return this._http.get(this.url+id,fabrica)
    }
}