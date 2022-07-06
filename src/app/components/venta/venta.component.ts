import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { ColorService } from 'src/app/service/color.service';
import { EstatusVentaService } from 'src/app/service/estatu_venta.service';
import { FabricaService } from 'src/app/service/fabrica.service';
import { InventarioService } from 'src/app/service/inventario.service';
import { PinturaService } from 'src/app/service/pintura.service';
import { ProductoService } from 'src/app/service/producto.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { VentaService } from 'src/app/service/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
  providers: [UsuarioService, ProductoService, FabricaService, PinturaService,
    ColorService, InventarioService, CarritoService, VentaService, EstatusVentaService]
})
export class VentaComponent implements OnInit {




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
  public factura:string;
  public total: number;

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
  ) {
    const selectElement = document.querySelector('.cantidad');
    this.buscar = "";
    this.factura="";
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
    this.fabricaSave = new Fabrica(0, true, '', '');
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
    this.loadUsuario();
    this.index();
    this.indexFabrica();
    this.indexPintura();
    this.indexColor();
    
  }


  buscarInventario(id: any) {
    if (isEmptyObject(id)) {
      this.ngOnInit();
    } else {
      if (!isNaN(id)) {
        this._inventarioService.getIdInventario(id).subscribe(
          inventarioResponse => {
            this.inventario = [inventarioResponse];
            this.inventarios = this.inventario
          }
        )
      } else {
        console.log('Pendidante');
      }
    }
  }

  selectId(id: any
    , precio: any
    , precioMayoreo: any
    , precioCredito: any
    , precioNoCredito: any
    , precioPueblaVirgen: any
    , precio_peubla: any
    , precio_santa: any
    , precio_perico: any
    , precio_tacamachalco: any
    , precio_tepeaca: any) {
    localStorage.setItem('idInventario', id);

    if (this.clientefiltro == 1) {
      $('#precio_carrito').val(precio);
    }
    if (this.clientefiltro == 2) {
      $('#precio_carrito').val(precioMayoreo);
    }
    if (this.clientefiltro == 3) {
      $('#precio_carrito').val(precioCredito);
    }
    if (this.clientefiltro == 4) {
      $('#precio_carrito').val(precioNoCredito);
    }
    if (this.clientefiltro == 5) {
      $('#precio_carrito').val(precioPueblaVirgen);
    }
    if (this.clientefiltro == 6) {
      $('#precio_carrito').val(precio_peubla);
    }
    if (this.clientefiltro == 7) {
      $('#precio_carrito').val(precio_santa);
    }
    if (this.clientefiltro == 8) {
      $('#precio_carrito').val(precio_perico);
    }
    if (this.clientefiltro == 9) {
      $('#precio_carrito').val(precio_tacamachalco);
    }
    if (this.clientefiltro == 10) {
      $('#precio_carrito').val(precio_tepeaca);
    }
  }

  selectIdEliminar(id: any) {
    localStorage.setItem('idInventario', id);
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
    this._inventarioService.index().subscribe(
      data => {
        this.inventarios = data.content;
        
        let idVenta = localStorage.getItem('idVenta');
        this._ventaService.getIdVenta(idVenta).subscribe(
          ventaResponse=>{
            this.venta=ventaResponse;
            this.factura=this.venta.uid_venta;
          }
        )
      })
  }
  indexFabrica() {
    this._pinturaService.index().subscribe(
      data => {
        this.pinturas = data.content;
      })
  }

  indexColor() {
    this._colorService.index().subscribe(
      data => {
        this.colores = data.content;
      })
  }
  indexPintura() {
    this._fabricaService.index().subscribe(
      data => {
        this.fabricas = data.content;
      })
  }

  agregarCarrito(form: any) {
    var cantidad = $('#cantidad_carrito').val();
    var precio_neto = $('#precio_carrito').val();
    var total = $('#total_carrito').val();
    let idInv = localStorage.getItem('idInventario');

    let idVen = localStorage.getItem('idVenta');
    this._ventaService.getIdVenta(idVen).subscribe(
      ventaresponse => {
        this.venta = ventaresponse;
        this.carrito = this.carritoSave;
        this.carrito.inventario.id = idInv;
        this.carrito.venta.id = this.venta.id;
        this.carrito.cantidad = cantidad;
        this.carrito.precio_neto = precio_neto;
        this.carrito.total = total;
        this._carritoService.store(this.carrito).subscribe(
          result => {
            this.estatus = "exito";
            this.mensaje = "Producto agregado al carrito con exito";
            localStorage.removeItem('idInventario')
            this.ngOnInit();
          },
          error => {
            this.estatus = "error";
            this.mensaje = "Error al agregado el carrito"
            localStorage.removeItem('idInventario')
          }
        )
      }
    )
  }

  carritoVer() {
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

  actualizar_total() {
    let cantidad = $('#cantidad_carrito').val();
    let precio = $('#precio_carrito').val();


    const multiplicar = function (cantidad: any, precio: any) {
      return cantidad * precio;
    }

    const total = multiplicar(cantidad, precio);

    $('#total_carrito').val(total);

  }

  actualizar_total_editar() {
    let cantidad = $('#cantidad_editar').val();
    let precio = $('#precio_editar').val();


    const multiplicar = function (cantidad: any, precio: any) {
      return cantidad * precio;
    }

    const total = multiplicar(cantidad, precio);

    $('#total_editar').val(total);

  }

  borrarProducto() {
    let idInv = localStorage.getItem('idInventario');
    let id = localStorage.getItem('idVenta');
    this._carritoService.borrarProducto(id, idInv).subscribe(

    )
    this.estatus = "exito";
    this.mensaje = "Producto eliminado";
    localStorage.removeItem('idInventario')
    this.ngOnInit();
  }

  selecIdEditarCarrito(idInv: any,
    cantidad: any,
    precio_neto: any,
    total: any) {
    $('#cantidad_editar').val(cantidad);
    $('#precio_editar').val(precio_neto);
    $('#total_editar').val(total);
    let id = localStorage.getItem('idVenta');
    this._carritoService.getVentaInventarioCarrito(id, idInv).subscribe(
      carritoResponse => {
        this.carrito = carritoResponse[0];
        localStorage.setItem('idCarrito', this.carrito.id);
      }
    )
  }

  EditarCarrito() {
    var cantidad = $('#cantidad_editar').val();
    var precio_neto = $('#precio_editar').val();
    var total = $('#total_editar').val();
    let idCarrito = localStorage.getItem('idCarrito');
    this._carritoService.getIdCarrito(idCarrito).subscribe(
      carritoResponse => {
        this.carrito = carritoResponse;
        this.carrito.cantidad = cantidad;
        this.carrito.precio_neto = precio_neto;
        this.carrito.total = total;
        this._carritoService.actualizarCarrito(idCarrito, this.carrito).subscribe(
          result => {
            this.estatus = "exito";
            this.mensaje = "Producto actualizado al carrito con exito";
            localStorage.removeItem('idCarrito')
            this.ngOnInit();
          },
          error => {
            this.estatus = "error";
            this.mensaje = "Error al actualizado el carrito"
            localStorage.removeItem('idCarrito')
          }
        )
      }
    )
  }

  pagarVenta(total: any) {
    let idVenta = localStorage.getItem('idVenta');
    this._ventaService.getIdVenta(idVenta).subscribe(
      ventaresponse => {
        this.venta = ventaresponse;
        this._estatusVentaService.getIdEstatusVenta(2).subscribe(
          esttausVentaResponse => {
            this.venta.estatusVenta = esttausVentaResponse;
            this.venta.total = total;
            console.log(this.venta);
            this._ventaService.actualizarVenta(idVenta,this.venta).subscribe(
              resuklt => {
                localStorage.removeItem('idCarrito')
                this._router.navigate(['pago'])
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
