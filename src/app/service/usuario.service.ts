import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { Producto } from "../models/producto";
import { global } from "../helpers/global";

@Injectable()
export class UsuarioService{
    public url;
    public identity:any;
    constructor(
        public _http:HttpClient
    ){
        this.url=global.url+'usuarios/';
        this.identity="";
    }

    index():Observable<any>{
        return this._http.get(this.url)
    }

    store(usuario:any):Observable<any>{
        return this._http.post(this.url,usuario)
    }
    getIdUsuario(id:any):Observable<any>{
        return this._http.get(this.url+id)
    }

    login(id:any,pass:any):Observable<any>{
        return this._http.get(this.url+'login/'+id+'&'+pass)
    }

    actualizarUsuario(id:any,usuario:any):Observable<any>{
        return this._http.get(this.url+id,usuario)
    }

    getIdentity(){
        let identity=JSON.parse(localStorage.getItem('usuario')|| '{}');

        if(identity && identity!="undefined"){
            this.identity=identity;
        }else{
            this.identity=null;
        }
        return this.identity;
    }

}