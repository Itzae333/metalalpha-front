import { Component, OnInit } from '@angular/core';
import { isEmptyObject } from 'jquery';
import { Color } from 'src/app/models/color';
import { Fabrica } from 'src/app/models/fabrica';
import { Inventario } from 'src/app/models/inventario';
import { Pintura } from 'src/app/models/pintura';
import { Producto } from 'src/app/models/producto';
import { ColorService } from 'src/app/service/color.service';
import { FabricaService } from 'src/app/service/fabrica.service';
import { InventarioService } from 'src/app/service/inventario.service';
import { PinturaService } from 'src/app/service/pintura.service';
import { ProductoService } from 'src/app/service/producto.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [UsuarioService, ProductoService, FabricaService, PinturaService, ColorService, InventarioService]
})
export class ProductoComponent implements OnInit {
  public usuario: any;
  public producto: any;
  public productoEdit: any;
  public inventario: any;
  public productos: Producto[];
  public fabricas: Fabrica[];
  public pinturas: Pintura[];
  public colores: Color[];
  public fabricaSave: Fabrica;
  public colorSave: Color;
  public pinturaSave: Pintura;
  public productoSave: Producto;
  public inventarioSave: Inventario;
  public nivel: any;
  public estatus: string;
  public mensaje: string;
  public fabricafiltro: any;
  public buscar: string;
  constructor(
    private _usuarioService: UsuarioService,
    private _productoService: ProductoService,
    private _fabricaService: FabricaService,
    private _pinturaService: PinturaService,
    private _colorService: ColorService,
    private _inventarioService: InventarioService
  ) {
    this.buscar = "";
    this.estatus = "";
    this.mensaje = "";
    this.productos = [];
    this.colores = [];
    this.fabricas = [];
    this.pinturas = [];
    this.colorSave = new Color(0, true, '');
    this.fabricaSave = new Fabrica(0, true, '', '');
    this.pinturaSave = new Pintura(0, true, '');
    this.productoSave = new Producto(0, '', '', '', 0, 0, 0, 0, 0, 0,0,0,0, 0, true, this.pinturaSave, this.fabricaSave);
    this.inventarioSave = new Inventario(0, true, 0, this.productoSave, this.colorSave, this.fabricaSave);
  }

  ngOnInit(): void {
    this.loadUsuario();
    this.index();
    this.indexFabrica();
    this.indexPintura();
    this.indexColor();
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
  }

  index() {
    this._productoService.index().subscribe(
      data => {
        this.productos = data.content;
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

  buscarProducto(id: any) {
    if (isEmptyObject(id)) {
      this.ngOnInit();
    } else {
      if (!isNaN(id)) {
        this._productoService.getIdProducto(id).subscribe(
          productoResponse => {
            this.producto = [productoResponse];
            this.productos = this.producto
          }
        )
      } else {
        this._productoService.getNombreProducto(id).subscribe(
          productoResponse => {
            this.producto = [productoResponse];
            this.productos = this.producto
          }
        )
      }
    }
  }


  selectId(id: any) {
    localStorage.setItem('idProducto', id);
  }

  guardarProducto(form: any) {
    this.producto = form.value;
    this._pinturaService.getNombrePintura(this.producto.pintura).subscribe(
      pinturaResponse => {
        this.productoSave.pintura = pinturaResponse;
        this._fabricaService.getNombreFabrica(this.producto.fabrica).subscribe(
          fabricaResponse => {
            this.productoSave.fabrica = fabricaResponse;
            this._productoService.store(this.productoSave).subscribe(
              result => {
                this.estatus = "exito";
                this.mensaje = "Producto agregado con exito";
                this.ngOnInit();
              },
              error => {
                this.estatus = "error";
                this.mensaje = "Error al registrar producto"
              }
            )
          }
        )
      }
    )

  }

  borrarProducto() {
    let idpro = localStorage.getItem('idProducto');
    this._productoService.getIdProducto(idpro).subscribe(
      productoResponse => {
        this.producto = productoResponse;
        this.producto.activo = false;
        this._productoService.actualizarProducto(idpro, this.producto).subscribe(
          resul => {
            this.estatus = "exito";
            this.mensaje = "Producto borrado Con exito"
            localStorage.removeItem('idProducto')
            this.ngOnInit();
          },
          error => {
            this.estatus = "error";
            this.mensaje = "Error al borrar producto"
            localStorage.removeItem('idProducto')
          }
        )
      }
    )
  }

  agregarInventario(form: any) {
    this.inventario = form.value;
    let idpro = localStorage.getItem('idProducto');
    this._productoService.getIdProducto(idpro).subscribe(
      productoResponse => {
        this.inventarioSave.producto = productoResponse;
        this._colorService.getNombreColor(this.inventario.color).subscribe(
          colorResponse => {
            this.inventarioSave.color = colorResponse;
            this.inventarioSave.fabrica = this.usuario.fabrica;
            this._inventarioService.store(this.inventarioSave).subscribe(
              resul => {
                this.estatus = "exito";
                this.mensaje = "El producto fue agregado al inventario correctamente"
                localStorage.removeItem('idProducto')
                this.ngOnInit();
              },
              error => {
                this.estatus = "error";
                this.mensaje = "Error al agregar producto al inventario"
                localStorage.removeItem('idProducto')
              }
            )
          }
        )
      }
    )
  }


  selectEdit = function (id: any,
    nombre: any,
    medidas: any,
    tipo: any,
    precio_public: any,
    precio_mayoreo: any,
    precio_credito: any,
    precio_creditoNo: any,
    precio_puebla_virgen: any,
    precio_puebla: any,
    precio_santa: any,
    precio_perico: any,
    precio_tecamachalco: any,
    precio_tepeaca: any,
    pintura: any,
    fabrica: any,) {
    $('#nombreEditar').val(nombre);
    $('#medidasEditar').val(medidas);
    $('#tipoEditar').val(tipo);
    $('#precio_publicEditar').val(precio_public);
    $('#precio_mayoreoEditar').val(precio_mayoreo);
    $('#precio_creditoEditar').val(precio_credito);
    $('#precio_noCreditoEditar').val(precio_creditoNo);
    $('#precio_pueblaVirgenEditar').val(precio_puebla_virgen);
    $('#precio_pueblaEditar').val(precio_puebla);
    $('#precio_santaEditar').val(precio_santa);
    $('#precio_pericoEditar').val(precio_perico);
    $('#precio_tecamachalcoEditar').val(precio_tecamachalco);
    $('#precio_tepeacaEditar').val(precio_tepeaca);
    $('#pinturaEditar').val(pintura);
    $('#fabricaEditar').val(fabrica);
    localStorage.setItem('idProducto', id);
  }

  actualizarProducto(form: any) {
    var nombre = $('#nombreEditar').val();
    var medidas = $('#medidasEditar').val();
    var tipo = $('#tipoEditar').val();
    var precio_public = $('#precio_publicEditar').val();
    var precio_mayoreo = $('#precio_mayoreoEditar').val();
    var precio_credito = $('#precio_creditoEditar').val();
    var precio_creditoNo = $('#precio_noCreditoEditar').val();
    var precio_puebla_virgen = $('#precio_pueblaVirgenEditar').val();
    var precio_puebla = $('#pueblaEditar').val();
    var precio_santa = $('#precio_santaEditar').val();
    var precio_perico = $('#precio_pericoEditar').val();
    var precio_tecamachalco = $('#precio_tecamachalcoEditar').val();
    var precio_tepeaca = $('#precio_tepeacaEditar').val();
    var pintura = $('#pinturaEditar').val();
    var fabrica = $('#fabricaEditar').val();
    let idpro = localStorage.getItem('idProducto');
    this.producto = form.value;
    this.producto.nombre = nombre;
    this.producto.medidas = medidas;
    this.producto.tipo = tipo;
    this._productoService.getIdProducto(idpro).subscribe(
      productoResponse => {
        this.productoEdit = productoResponse;
        if (precio_public == undefined) {
          this.producto.precio_public = this.productoEdit.precio_public;
        } else {
          this.producto.precio_public = precio_public;
        }
        if (precio_mayoreo == undefined) {
          this.producto.precio_mayoreo = this.productoEdit.precio_mayoreo;
        } else {
          this.producto.precio_mayoreo = precio_mayoreo;
        }
        if (precio_credito == undefined) {
          this.producto.precio_credito = this.productoEdit.precio_credito;
        } else {
          this.producto.precio_credito = precio_credito;
        }
        if (precio_creditoNo == undefined) {
          this.producto.precio_creditoNo = this.productoEdit.precio_creditoNo;
        } else {
          this.producto.precio_creditoNo = precio_creditoNo;
        }
        if (precio_puebla_virgen == undefined) {
          this.producto.precio_puebla_virgen = this.productoEdit.precio_puebla_virgen;
        } else {
          this.producto.precio_puebla_virgen = precio_puebla_virgen;
        }
        if (precio_puebla == undefined) {
          this.producto.precio_puebla = this.productoEdit.precio_puebla;
        } else {
          this.producto.precio_puebla = precio_puebla;
        }
        if (precio_santa == undefined) {
          this.producto.precio_santa = this.productoEdit.precio_santa;
        } else {
          this.producto.precio_santa = precio_santa;
        }
        if (precio_perico == undefined) {
          this.producto.precio_perico = this.productoEdit.precio_perico;
        } else {
          this.producto.precio_perico = precio_perico;
        }
        if (precio_tecamachalco == undefined) {
          this.producto.precio_tecamachalco = this.productoEdit.precio_tecamachalco;
        } else {
          this.producto.precio_tecamachalco = precio_tecamachalco;
        }
        if (precio_tepeaca == undefined) {
          this.producto.precio_tepeaca = this.productoEdit.precio_tepeaca;
        } else {
          this.producto.precio_tepeaca = precio_tepeaca;
        }
        
        this._pinturaService.getNombrePintura(pintura).subscribe(
          pinturaResponse => {
            this.producto.pintura = pinturaResponse;
            this._fabricaService.getNombreFabrica(fabrica).subscribe(
              fabricaResponse => {
                this.producto.fabrica = fabricaResponse;
                this.producto.activo=true;
                this._productoService.actualizarProducto(idpro,this.producto).subscribe(
                  result => {
                    this.estatus = "exito";
                    this.mensaje = "Producto Actualizado con exito";
                    this.ngOnInit();
                  },
                  error => {
                    this.estatus = "error";
                    this.mensaje = "Error al Actualizar producto"
                  }
                )
              }
            )
          }
        )
      }
    )

  }

}
