import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { global } from "../helpers/global";

@Injectable()
export class NivelUsuarioService{
    public url;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'niveles-usuarios/';
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(nivelUsuario:any):Observable<any>{
        return this._http.post(this.url,nivelUsuario)
    }
    getIdNivelUsuario(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }
    getNombreNivelUsuario(nombre:any):Observable<any>{
        return this._http.get(this.url+'nombre/'+nombre)
    }

    actualizarNivelUsuario(id:any,nivelUsuario:any):Observable<any>{
        return this._http.get(this.url+id,nivelUsuario)
    }
}