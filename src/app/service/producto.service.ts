import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Producto } from "../models/producto";
import { global } from "../helpers/global";

@Injectable()
export class ProductoService {
    public url;
    constructor(
        public _http: HttpClient
    ) {
        this.url = global.url + 'productos/';
    }

    index(): Observable<any> {
        return this._http.get(this.url)
    }

    store(producto: any): Observable<any> {
        return this._http.post(this.url, producto)
    }
    getIdProducto(id: any): Observable<any> {
        return this._http.get(this.url + id)
    }
    getNombreProducto(nombre: any): Observable<any> {
        return this._http.get(this.url + 'nombre/' + nombre)
    }

    actualizarProducto(id: any, producto: any): Observable<any> {
        return this._http.put(this.url + id, producto)
    }
}