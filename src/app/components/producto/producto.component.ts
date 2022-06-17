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
  providers: [UsuarioService, ProductoService, FabricaService, PinturaService,ColorService,InventarioService]
})
export class ProductoComponent implements OnInit {
  public usuario: any;
  public producto: any;
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
    this.fabricaSave = new Fabrica(0, true, '');
    this.pinturaSave = new Pintura(0, true, '');
    this.productoSave = new Producto(0, '', '', '', 0, 0, 0, 0, 0, 0, 0, true, this.pinturaSave, this.fabricaSave);
    this.inventarioSave = new Inventario(0, true,0,this.productoSave,this.colorSave,this.fabricaSave);
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

  agregarInventario(form:any){
    this.inventario=form.value;
    let idpro = localStorage.getItem('idProducto');
    this._productoService.getIdProducto(idpro).subscribe(
      productoResponse => {
        this.inventarioSave.producto = productoResponse;
        this._colorService.getNombreColor(this.inventario.color).subscribe(
          colorResponse => {
            this.inventarioSave.color = colorResponse;
            this.inventarioSave.fabrica =this.usuario.fabrica;
            console.log(this.inventarioSave);
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

}
