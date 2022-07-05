import { Component, OnInit } from '@angular/core';
import { isEmptyObject } from 'jquery';
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
import { UsuarioService } from 'src/app/service/usuario.service';
import { VentaService } from 'src/app/service/venta.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [UsuarioService, CarritoService, VentaService, EstatusVentaService]
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
    this.fabricaSave = new Fabrica(0, true, '');
    this.pinturaSave = new Pintura(0, true, '');
    this.tipoCuentaSave = new Tipo_Cuenta(1, true, 'publico');
    this.clienteSave = new Cliente(1, true, 'mostrador', 'mostrador', 'mostrador', 'mostrador', this.tipoCuentaSave)
    this.productoSave = new Producto(0, '', '', '', 0, 0, 0, 0, 0, 0, 0, true, this.pinturaSave, this.fabricaSave);
    this.inventarioSave = new Inventario(0, true, 0, this.productoSave, this.colorSave, this.fabricaSave);
    this.nivelUsuarioSave=new Nivel_Usuario(0,true,'');
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
      if (this.usuario.nivelUsuario.descripcion == "administrador") {
        this.nivel = 1;
      }
      if (this.usuario.fabrica.descripcion == "virgen") {
        this.fabricafiltro = 1;
      }
      if (this.usuario.fabrica.descripcion == "puebla") {
        this.fabricafiltro = 2;
      }
      if (this.usuario.fabrica.descripcion == "santa") {
        this.fabricafiltro = 3;
      }
    }
    if (!isEmptyObject(this.cliente)) {
      if (this.cliente.tipoCuenta.descripcion == "Publico") {
        this.clientefiltro = 1;
      }
      if (this.cliente.tipoCuenta.descripcion == "Mayoreo") {
        this.clientefiltro = 2;
      }
      if (this.cliente.tipoCuenta.descripcion == "Credito") {
        this.clientefiltro = 3;
      }
      if (this.cliente.tipoCuenta.descripcion == "NoCredito") {
        this.clientefiltro = 4;
      }
      if (this.cliente.tipoCuenta.descripcion == "Puebla") {
        this.clientefiltro = 5;
      }
      if (this.cliente.tipoCuenta.descripcion == "Puebla") {
        this.clientefiltro = 6;
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
  }

  actualizar_dinero() {
    let cantidad = $('#cantidad_editar').val();
    let precio = $('#precio_editar').val();


    const multiplicar = function (cantidad: any, precio: any) {
      return cantidad * precio;
    }

    const total = multiplicar(cantidad, precio);

    $('#total_editar').val(total);

  }



}
