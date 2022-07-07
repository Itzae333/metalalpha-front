import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data, isEmptyObject } from 'jquery';
import { Carrito } from 'src/app/models/carrito';
import { Cliente } from 'src/app/models/cliente';
import { Color } from 'src/app/models/color';
import { Estatus_Venta } from 'src/app/models/estatu_venta';
import { Fabrica } from 'src/app/models/fabrica';
import { Inventario } from 'src/app/models/inventario';
import { Nivel_Usuario } from 'src/app/models/nivel_usuario';
import { Pintura } from 'src/app/models/pintura';
import { Producto } from 'src/app/models/producto';
import { Tipo_Cuenta } from 'src/app/models/tipo_cuenta';
import { Usuario } from 'src/app/models/usuario';
import { Venta } from 'src/app/models/venta';
import { CarritoService } from 'src/app/service/carrito.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { EstatusVentaService } from 'src/app/service/estatu_venta.service';
import { InventarioService } from 'src/app/service/inventario.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { VentaService } from 'src/app/service/venta.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [UsuarioService, CarritoService, VentaService, EstatusVentaService,InventarioService]
})
export class PagoComponent implements OnInit {
  public usuario: any;
  public producto: any;
  public carrito: any;
  public venta: any;
  public productoEdit: any;
  public inventario: any;
  public productos: Producto[];
  public fabricas: Fabrica[];
  public pinturas: Pintura[];
  public inventarios: Inventario[];
  public carritos: Carrito[];
  public colores: Color[];
  public fabricaSave: Fabrica;
  public colorSave: Color;
  public clienteSave: Cliente;
  public tipoCuentaSave: Tipo_Cuenta;
  public pinturaSave: Pintura;
  public productoSave: Producto;
  public estatusVentaSave: Estatus_Venta;
  public inventarioSave: Inventario;
  public ventaSave: Venta;
  public carritoSave: Carrito;
  public usuarioSave:Usuario;
  public nivelUsuarioSave:Nivel_Usuario;
  public nivel: any;
  public estatus: string;
  public mensaje: string;
  public fabricafiltro: any;
  public clientefiltro: any;
  public buscar: string;
  public cliente: any;
  public clientes: Cliente[];
  public total: number;
  constructor(
    private _carritoService: CarritoService,
    private _ventaService: VentaService,
    private _clienteService: ClienteService,
    private _usuarioService: UsuarioService,
    private _estatusVentaService: EstatusVentaService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _inventarioService: InventarioService,

  ) {
    this.buscar = "";
    this.estatus = "";
    this.mensaje = "";
    this.productos = [];
    this.total = 0;
    this.colores = [];
    this.fabricas = [];
    this.pinturas = [];
    this.inventarios = [];
    this.clientes = [];
    this.carritos = [];
    this.colorSave = new Color(0, true, '');
    this.estatusVentaSave = new Estatus_Venta(1, true, 'apertura');
    this.fabricaSave = new Fabrica(0, true, '', '', '', '', '', '', '', '');
    this.pinturaSave = new Pintura(0, true, '');
    this.tipoCuentaSave = new Tipo_Cuenta(1, true, 'Publico', 'P');
    this.clienteSave = new Cliente(1, true, 'mostrador', 'mostrador', 'mostrador', 'mostrador', this.tipoCuentaSave)
    this.productoSave = new Producto(0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, true, this.pinturaSave, this.fabricaSave);
    this.inventarioSave = new Inventario(0, true, 0, this.productoSave, this.colorSave, this.fabricaSave);
    this.nivelUsuarioSave=new Nivel_Usuario(0,true,'','');
    this.usuarioSave=new Usuario(0,true,'','','','','',this.fabricaSave,this.nivelUsuarioSave);
    this.ventaSave = new Venta(0, true,'' ,0, 0, 0, 0, this.clienteSave, this.estatusVentaSave,this.usuarioSave);
    this.carritoSave = new Carrito(0, true, 0, 0, 0, this.inventarioSave, this.ventaSave);
   }

  ngOnInit(): void {
    this.loadUsuario();
    this.index();
  }

  loadUsuario() {
    this.usuario = this._usuarioService.getIdentity();
    this.cliente = this._clienteService.getIdentityCliente();
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
      if (this.usuario.fabrica.identificador == "VIR") {
        this.fabricafiltro = 1;
      }
      if (this.usuario.fabrica.identificador == "PUE") {
        this.fabricafiltro = 2;
      }
      if (this.usuario.fabrica.identificador == "SAN") {
        this.fabricafiltro = 3;
      }
      if (this.usuario.fabrica.identificador == "PER") {
        this.fabricafiltro = 4;
      }
      if (this.usuario.fabrica.identificador == "TEC") {
        this.fabricafiltro = 5;
      }
      if (this.usuario.fabrica.identificador == "TEP") {
        this.fabricafiltro = 6;
      }
    }
    if (!isEmptyObject(this.cliente)) {
      if (this.cliente.tipoCuenta.identificador == "P") {
        this.clientefiltro = 1;
      }
      if (this.cliente.tipoCuenta.identificador == "M") {
        this.clientefiltro = 2;
      }
      if (this.cliente.tipoCuenta.identificador == "C") {
        this.clientefiltro = 3;
      }
      if (this.cliente.tipoCuenta.identificador == "NC") {
        this.clientefiltro = 4;
      }
      if (this.cliente.tipoCuenta.identificador == "PUV") {
        this.clientefiltro = 5;
      }
      if (this.cliente.tipoCuenta.identificador == "PUE") {
        this.clientefiltro = 6;
      }
      if (this.cliente.tipoCuenta.identificador == "SAN") {
        this.clientefiltro = 7;
      }
      if (this.cliente.tipoCuenta.identificador == "PE") {
        this.clientefiltro = 8;
      }
      if (this.cliente.tipoCuenta.identificador == "TEC") {
        this.clientefiltro = 9;
      }
      if (this.cliente.tipoCuenta.identificador == "TEP") {
        this.clientefiltro = 10;
      }
    }
  }



  index() {
    let idVen = localStorage.getItem('idVenta');
    this._carritoService.getVentaCarrito(idVen).subscribe(
      data => {
        this.carrito = data;
        this.carritos = data;
        this.total = this.carrito.reduce((
          acc: any,
          obj: any,
        ) => acc + (obj.total),
          0);
      })
      this._ventaService.getIdVenta(idVen).subscribe(
        data=>{
          localStorage.setItem('total',data.total);
        }
      )
  }

  actualizar_dinero() {
    let total_venta = localStorage.getItem('total');
    let recibido = $('#recibido').val();


    const resta = function (total_venta: any, recibo: any) {
 
      return recibo-total_venta
    }

    const cambioSigno = function ( restan: any) {
 
      return restan*-1
    }

    const restan = resta(total_venta, recibido);
    if(restan<0){
      $('#restan').val(cambioSigno(restan));
      $('#cambio').val(0);
    }else{
      $('#restan').val(0);
      $('#cambio').val(restan);
    }
  }

  finalizarPago(){
    let recibido = $('#recibido').val();
    let restan = $('#restan').val();
    let cambio = $('#cambio').val();
    let idVen = localStorage.getItem('idVenta');
    const actualizacionExistencias = function ( existencias: any,unidades: any) {
 
      return existencias-unidades;
    }
    this._ventaService.getIdVenta(idVen).subscribe(
      ventaResponse=>{
        this.venta=ventaResponse;
        this.venta.recibido=recibido;
        this.venta.restan=restan;
        this.venta.cambio=cambio;
        this._estatusVentaService.getIdEstatusVenta(3).subscribe(
          esttausVentaResponse => {
            this.venta.estatusVenta = esttausVentaResponse;
            this._ventaService.actualizarVenta(idVen,this.venta).subscribe(
              resuklt => {
               
                for(let i=0;i<this.carritos.length;i++){
                  this._inventarioService.getIdInventario(this.carritos[i].inventario.id).subscribe(
                    data=>{
                      
                      let existencias=data.existencias;
                     
                      let idInventario=data.id;
                      
                      let unidades=this.carritos[i].cantidad;
                      
                      this.inventario=data;
                     
                      this.inventario.existencias=actualizacionExistencias(existencias,unidades);
                      this._inventarioService.actualizarInventario(idInventario,this.inventario).subscribe(
                        inventarioResponse=>{
                          
                        }
                      )
                      
                    }
                  )
                }
                this._router.navigate(['ticket'])
              },
              error => {
                this.estatus = "error";
                this.mensaje = "Error al cerrar el ticket el carrito"
                localStorage.removeItem('idCarrito')
              }
            )
          }
        )
      }
    )
  }



}
