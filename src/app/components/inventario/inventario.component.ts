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
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  providers: [UsuarioService, ProductoService, FabricaService, PinturaService, ColorService, InventarioService]
})
export class InventarioComponent implements OnInit {
  public usuario: any;
  public producto: any;
  public productoEdit: any;
  public inventario: any;
  public productos: Producto[];
  public fabricas: Fabrica[];
  public pinturas: Pintura[];
  public inventarios: Inventario[];
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
    this.inventarios = [];
    this.colorSave = new Color(0, true, '');
    this.fabricaSave = new Fabrica(0, true, '');
    this.pinturaSave = new Pintura(0, true, '');
    this.productoSave = new Producto(0, '', '', '', 0, 0, 0, 0, 0, 0, 0, true, this.pinturaSave, this.fabricaSave);
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
  }

  index() {
    this._inventarioService.index().subscribe(
      data => {
        this.inventarios = data.content;
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

  selectId(id: any) {
    localStorage.setItem('idInventario', id);
  }

  borrarInventario() {
    let idInv = localStorage.getItem('idInventario');
    this._inventarioService.getIdInventario(idInv).subscribe(
      inventarioResponse => {
        this.inventario = inventarioResponse;
        this.inventario.activo = false;
        this._inventarioService.actualizarInventario(idInv, this.inventario).subscribe(
          resul => {
            this.estatus = "exito";
            this.mensaje = "Producto borrado Con exito del inventario"
            localStorage.removeItem('idInventario')
            this.ngOnInit();
          },
          error => {
            this.estatus = "error";
            this.mensaje = "Error al borrar producto del inventario"
            localStorage.removeItem('idInventario')
          }
        )
      }
    )
  }

  selectEdit = function (id: any,
    nombre: any,
    medidas: any,
    tipo: any,
    existencias: any,
    color: any,
    fabrica: any,
    pintura: any,
    idProducto: any) {
    $('#nombreEditar').val(nombre);
    $('#medidasEditar').val(medidas);
    $('#tipoEditar').val(tipo);
    $('#existenciasEditar').val(existencias);
    $('#colorEditar').val(color);
    $('#pinturaEditar').val(pintura);
    $('#fabricaEditar').val(fabrica);
    localStorage.setItem('idInventario', id);
    localStorage.setItem('idProducto', idProducto);
  }

  actrualizarInventario(form: any) {
    var nombre = $('#nombreEditar').val();
    var medidas = $('#medidasEditar').val();
    var tipo = $('#tipoEditar').val();
    var existencias = $('#existenciasEditar').val();
    let idpro = localStorage.getItem('idProducto');
    let idInv = localStorage.getItem('idInventario');
    var fabrica = $('#fabricaEditar').val();
    var color = $('#colorEditar').val();
    this.inventario = this.inventarioSave;
    this.inventario.producto.nombre = nombre;
    this.inventario.producto.medidas = medidas;
    this.inventario.producto.tipo = tipo;
    this.inventario.existencias = existencias;
    this._productoService.getIdProducto(idpro).subscribe(
      productoResponse => {
        this.inventario.producto = productoResponse;
        this._colorService.getNombreColor(color).subscribe(
          colorResponse => {
            this.inventario.color = colorResponse;
            this._fabricaService.getNombreFabrica(fabrica).subscribe(
              fabricaResponse => {
                this.inventario.fabrica = fabricaResponse;
                this.inventario.activo = true;
                console.log(this.inventario)
                this._inventarioService.actualizarInventario(idInv, this.inventario).subscribe(
                  result => {
                    this.estatus = "exito";
                    this.mensaje = "Inventario Actualizado con exito";
                    this.ngOnInit();
                  },
                  error => {
                    this.estatus = "error";
                    this.mensaje = "Error al Actualizar el inventario"
                  }
                )
              }
            )
          }
        )
      }
    )

  }

  tempo = function delay(n: any) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n * 1000);
    });
  }

}
