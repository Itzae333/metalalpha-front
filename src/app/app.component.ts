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
import { Fabrica } from './models/fabrica';
import { Nivel_Usuario } from './models/nivel_usuario';
import { Tipo_Cuenta } from './models/tipo_cuenta';

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
  public fabricaSave: Fabrica;
  public usuarioSave:Usuario;
  public clienteSave: Cliente;
  public tipoCuentaSave: Tipo_Cuenta;
  public ventaSave: Venta;
  public nivelUsuarioSave:Nivel_Usuario;
  
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
    this.fabricaSave = new Fabrica(0, true, '','');
    this.tipoCuentaSave = new Tipo_Cuenta(1, true, 'Publico','P');
    this.nivelUsuarioSave=new Nivel_Usuario(0,true,'','');
    this.clienteSave = new Cliente(1, true, 'mostrador', 'mostrador', 'mostrador', 'mostrador', this.tipoCuentaSave)
    this.usuarioSave=new Usuario(0,true,'','','','','',this.fabricaSave,this.nivelUsuarioSave);
    this.ventaSave = new Venta(0, true,'' ,0, 0, 0, 0, this.clienteSave, this.estatusVentaSave,this.usuarioSave);
  }

  ngDoCheck(): void {
    this.loadUsuario();
  }

  loadUsuario() {
    this.usuario = this._usuarioService.getIdentity();
    if (!isEmptyObject(this.usuario)) {
      if (this.usuario.nivelUsuario.identificador == "A") {
        this.nivel = 1;
      }
      if (this.usuario.nivelUsuario.identificador == "O") {
        this.nivel = 2;
      }
      if (this.usuario.nivelUsuario.identificador == "VP") {
        this.nivel = 3;
      }
      if (this.usuario.nivelUsuario.identificador == "E") {
        this.nivel = 4;
      }
    }
  }

  agregarVenta(){
    this.cliente = this._clienteService.getIdentityCliente();
    this.ventaSave.cliente=this.cliente;
    if (this.validarVenta()) {
      this._router.navigate(['venta'])
    } else {
      this.ventaSave.usuario=this._usuarioService.getIdentity();
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
