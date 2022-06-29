import { Component, DoCheck, OnInit } from '@angular/core';
import { Usuario } from './models/usuario';
import { isEmptyObject } from 'jquery';
import { UsuarioService } from './service/usuario.service';
import { ClienteService } from './service/cliente.service';
import { Cliente } from './models/cliente';
import { Estatus_Venta } from './models/estatu_venta';
import { Venta } from './models/venta';
import { VentaService } from './service/venta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService,ClienteService,VentaService]
})
export class AppComponent implements DoCheck {
  title = 'metalalpha_web';
  public usuario: any;
  public clienteBuscar: any;
  public nivel: any;
  public cliente: any;
  public venta: any;
  public estatusVentaSave: Estatus_Venta;
  public ventaSave: Venta;
  
  public clientes: Cliente[];
  constructor(
    public _usuarioService: UsuarioService,
    private _clienteService: ClienteService,
    private _ventaService:VentaService,
    private _router:Router
  ) {
    this.loadUsuario();
    this.nivel = "";
    this.clientes = [];
    this.estatusVentaSave = new Estatus_Venta(1, true, 'apertura');
    this.ventaSave = new Venta(0, true, 0, 0, 0, 0, this.cliente, this.estatusVentaSave)
  }

  ngDoCheck(): void {
    this.loadUsuario();
  }

  loadUsuario() {
    this.usuario = this._usuarioService.getIdentity();
    if (!isEmptyObject(this.usuario)) {
      if (this.usuario.nivelUsuario.descripcion == "administrador") {
        this.nivel = 1;
      }
    }
  }

  agregarVenta(){
    this.cliente = this._clienteService.getIdentityCliente();
    this.ventaSave.cliente=this.cliente;
    let idVen = localStorage.getItem('idVenta');
    if (this.validarVenta()) {
      this._router.navigate(['venta'])
    } else {
      this._ventaService.store(this.ventaSave).subscribe(
        ventaResponse=>{
            this.venta=ventaResponse;
          localStorage.setItem('idVenta', this.venta.id);
          this._router.navigate(['venta'])
  
        })
      
    }
    

  }

  buscarcliente(){
    this.clienteBuscar = $('#cliente_buscar').val();
    if (isEmptyObject(this.clienteBuscar)) {
      
    } else {
      if (!isNaN(this.clienteBuscar)) {
        this._clienteService.getIdCliente(this.clienteBuscar).subscribe(
          clienteResponse => {
            this.cliente = [clienteResponse];
            this.clientes = this.cliente;
            localStorage.setItem('cliente_venta',JSON.stringify(clienteResponse));
          }
        )
      } else {
        this._clienteService.getNombreCliente(this.clienteBuscar).subscribe(
          clienteResponse => {
            this.cliente = [clienteResponse];
            this.clientes = this.cliente;
            localStorage.setItem('cliente_venta',clienteResponse);
          }
        )
      }
    }
  }

  public validarVenta(){
    let idVen = localStorage.getItem('idVenta');
    if (!isEmptyObject(idVen)) {
      return true;
    } else {
      return false;
      
    }
  }


}
