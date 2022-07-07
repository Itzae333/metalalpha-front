import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isEmptyObject } from 'jquery';
import { Carrito } from 'src/app/models/carrito';
import { Cliente } from 'src/app/models/cliente';
import { Color } from 'src/app/models/color';
import { Estatus_Venta } from 'src/app/models/estatu_venta';
import { Fabrica } from 'src/app/models/fabrica';
import { Inventario } from 'src/app/models/inventario';
import { Items } from 'src/app/models/items';
import { Nivel_Usuario } from 'src/app/models/nivel_usuario';
import { Pintura } from 'src/app/models/pintura';
import { Producto } from 'src/app/models/producto';
import { Tipo_Cuenta } from 'src/app/models/tipo_cuenta';
import { Usuario } from 'src/app/models/usuario';
import { Venta } from 'src/app/models/venta';
import { CarritoService } from 'src/app/service/carrito.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { ColorService } from 'src/app/service/color.service';
import { EstatusVentaService } from 'src/app/service/estatu_venta.service';
import { FabricaService } from 'src/app/service/fabrica.service';
import { InventarioService } from 'src/app/service/inventario.service';
import { PinturaService } from 'src/app/service/pintura.service';
import { ProductoService } from 'src/app/service/producto.service';
import { TipoCuentaService } from 'src/app/service/tipo_cuenta.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { VentaService } from 'src/app/service/venta.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  providers: [UsuarioService, ProductoService, FabricaService, PinturaService,
    ColorService, InventarioService, CarritoService, VentaService, EstatusVentaService,TipoCuentaService]
})
export class AdministradorComponent implements OnInit {
  @ViewChild("modalUsuario", {static: false}) modalUsuario: TemplateRef<any> |undefined;
  @ViewChild("modalFabrica", {static: false}) modalFabrica: TemplateRef<any> |undefined;
  @ViewChild("modalPintura", {static: false}) modalPintura: TemplateRef<any> |undefined;
  @ViewChild("modalTipoCuenta", {static: false}) modalTipoCuenta: TemplateRef<any> |undefined;
  @ViewChild("modalColor", {static: false}) modalColor: TemplateRef<any> |undefined;
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
  public ventas: Venta[];
  public factura:string;
  public total: number;
  public itemG:any;
  public items:Items[];

  constructor(
    private _usuarioService: UsuarioService,
    private _productoService: ProductoService,
    private _fabricaService: FabricaService,
    private _pinturaService: PinturaService,
    private _colorService: ColorService,
    private _inventarioService: InventarioService,
    private _ventaService: VentaService,
    private _carritoService: CarritoService,
    private _clienteService: ClienteService,
    private _estatusVentaService: EstatusVentaService,
    private _router:Router,
    private _route:ActivatedRoute,
    private _tipoCuentaService: TipoCuentaService,
    private modalService: NgbModal,
  ) {
    this.buscar = "";
    this.factura="";
    this.estatus = "";
    this.mensaje = "";
    this.productos = [];
    this.ventas = [];
    this.items = [];
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
    this.tipoCuentaSave = new Tipo_Cuenta(1, true, 'publico', 'P');
    this.clienteSave = new Cliente(1, true, 'mostrador', 'mostrador', 'mostrador', 'mostrador', this.tipoCuentaSave)
    this.productoSave = new Producto(0, '', '', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, true, this.pinturaSave, this.fabricaSave);
    this.inventarioSave = new Inventario(0, true, 0, this.productoSave, this.colorSave, this.fabricaSave);
    this.nivelUsuarioSave=new Nivel_Usuario(0,true,'','');
    this.usuarioSave=new Usuario(0,true,'','','','','',this.fabricaSave,this.nivelUsuarioSave);
    this.ventaSave = new Venta(0, true,'' ,0, 0, 0, 0, this.clienteSave, this.estatusVentaSave,this.usuarioSave);
    this.carritoSave = new Carrito(0, true, 0, 0, 0, this.inventarioSave, this.ventaSave);
  }
  ngOnInit(): void {
    let num=$('#Modulo').val();
    this.validacionDeMetodo(num)
  }

  validacionDeMetodo(num:any){
    if(num=='Selecciona Modulo'){
      this.indexUsuario();
    }else if(num==1){
      this.indexUsuario();
    }else if(num==2){
      this.indexFabrica();
    }else if(num==3){
      this.indexPintura();
    }else if(num==4){
      this.indexTipoCuenta();
    }else if(num==5){
      this.indexColor();
    }
  }



  buscarVenta(id: any) {
    if (isEmptyObject(id)) {
      this.ngOnInit();
    } else {
      if (!isNaN(id)) {
        this._ventaService.getIdVenta(id).subscribe(
          ventaResponse => {
            this.venta = [ventaResponse];
            this.ventas = this.venta
          }
        )
      } else {
        console.log('Pendidante');
      }
    }
  }

  selectId(id: any) {
    localStorage.setItem('idVenta', id);
  }

  indexPintura() {
    this._pinturaService.index().subscribe(
      data => {
        this.items = data.content;
      })
  }

  indexTipoCuenta() {
    this._tipoCuentaService.index().subscribe(
      data => {
        this.items = data.content;
      })
  }

  indexColor() {
    this._colorService.index().subscribe(
      data => {
        this.items = data.content;
      })
  }
  indexFabrica() {
    this._fabricaService.index().subscribe(
      data => {
        this.items = data.content;
      })
  }

  indexUsuario() {
    this._usuarioService.index().subscribe(
      data => {
        this.items = data.content;

      })
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

  actualizarModulo(){
this.ngOnInit();
  }

  mostrarModal(id:any){
    localStorage.setItem('id',id);
    let num=$('#Modulo').val();
    if(num=='Selecciona Modulo'){
      
    }else if(num==1){
      this.modalService.open(this.modalUsuario);
    }else if(num==2){
      this.modalService.open(this.modalFabrica);
    }else if(num==3){
      this.modalService.open(this.modalPintura);
    }else if(num==4){
      this.modalService.open(this.modalTipoCuenta);
    }else if(num==5){
      this.modalService.open(this.modalColor);
    }
    
  }

  

}
