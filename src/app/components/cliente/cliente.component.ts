import { Component, OnInit } from '@angular/core';
import { isEmptyObject } from 'jquery';
import { Cliente } from 'src/app/models/cliente';
import { Tipo_Cuenta } from 'src/app/models/tipo_cuenta';
import { ClienteService } from 'src/app/service/cliente.service';
import { TipoCuentaService } from 'src/app/service/tipo_cuenta.service';
import { UsuarioService } from 'src/app/service/usuario.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClienteService, TipoCuentaService, UsuarioService]
})
export class ClienteComponent implements OnInit {
  public usuario: any;
  public cliente: any;
  public clientes: Cliente[];
  public tipoCuentas: Tipo_Cuenta[];
  public clienteSave: Cliente;
  public tipoCuentaSave: Tipo_Cuenta;
  public nivel: any;
  public estatus: string;
  public mensaje: string;
  public fabricafiltro: any;
  public buscar: string;

  constructor(
    private _usuarioService: UsuarioService,
    private _clienteService: ClienteService,
    private _tipoCuentaService: TipoCuentaService
  ) {
    this.buscar = "";
    this.estatus = "";
    this.mensaje = "";
    this.clientes = [];
    this.tipoCuentas = [];
    this.tipoCuentaSave = new Tipo_Cuenta(0, true, '');
    this.clienteSave = new Cliente(0, true, '', '', '', '', this.tipoCuentaSave)
  }

  ngOnInit(): void {
    this.loadUsuario();
    this.index();
    this.indexTipoCuenta();
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
    this._clienteService.index().subscribe(
      data => {
        this.clientes = data.content;
      })
  }

  indexTipoCuenta() {
    this._tipoCuentaService.index().subscribe(
      data => {
        this.tipoCuentas = data.content;
      })
  }

  buscarCliente(id: any) {
    if (isEmptyObject(id)) {
      this.ngOnInit();
    } else {
      if (!isNaN(id)) {
        this._clienteService.getIdCliente(id).subscribe(
          clienteResponse => {
            this.cliente = [clienteResponse];
            this.clientes = this.cliente
          }
        )
      } else {
        this._clienteService.getNombreCliente(id).subscribe(
          clienteResponse => {
            this.cliente = [clienteResponse];
            this.clientes = this.cliente
          }
        )
      }
    }
  }

  selectId(id: any) {
    localStorage.setItem('idCliente', id);
  }

  guardarCliente(form: any) {
    this.cliente = form.value;
    this._tipoCuentaService.getNombreTipoCuenta(this.cliente.tipoCuenta).subscribe(
      tipoCuentaResponse => {
        this.clienteSave.tipoCuenta = tipoCuentaResponse;
        this._clienteService.store(this.clienteSave).subscribe(
          result => {
            this.estatus = "exito";
            this.mensaje = "cliente agregado con exito";
            this.ngOnInit();
          },
          error => {
            this.estatus = "error";
            this.mensaje = "Error al registrar cliente"
          }
        )
      }
    )
  }

  borrarCliente() {
    let idpro = localStorage.getItem('idCliente');
    this._clienteService.getIdCliente(idpro).subscribe(
      clienteResponse => {
        this.cliente = clienteResponse;
        this.cliente.activo = false;
        this._clienteService.actualizarCliente(idpro, this.cliente).subscribe(
          resul => {
            this.estatus = "exito";
            this.mensaje = "Cliente borrado Con exito"
            localStorage.removeItem('idCliente')
            this.ngOnInit();
          },
          error => {
            this.estatus = "error";
            this.mensaje = "Error al borrar cliente"
            localStorage.removeItem('idCliente')
          }
        )
      }
    )
  }

  selectEdit = function (id: any,
    nombre: any,
    apellido: any,
    telefono: any,
    correo: any,
    tipoCuenta: any,) {
    $('#nombreEditar').val(nombre);
    $('#apellidoEditar').val(apellido);
    $('#telefonoEditar').val(telefono);
    $('#correoEditar').val(correo);
    $('#tipoCuentaEditar').val(tipoCuenta);
    localStorage.setItem('idCliente', id);
  }


  actualizarInventario(form: any) {
    var nombre = $('#nombreEditar').val();
    var apellido = $('#apellidoEditar').val();
    var telefono = $('#telefonoEditar').val();
    var correo = $('#correoEditar').val();
    var tipoCuenta = $('#tipoCuentaEditar').val();
    let idCli = localStorage.getItem('idCliente');
    this.cliente = form.value;
    this.cliente.nombre = nombre;
    this.cliente.apellido = apellido;
    this.cliente.telefono = telefono;
    this.cliente.correo = correo;
    this._tipoCuentaService.getNombreTipoCuenta(tipoCuenta).subscribe(
      tipoCuentaresponse => {
        this.cliente.tipoCuenta = tipoCuentaresponse;
        this.cliente.activo=true;
        this._clienteService.actualizarCliente(idCli, this.cliente).subscribe(
          result => {
            this.estatus = "exito";
            this.mensaje = "Cliente Actualizado con exito";
            localStorage.removeItem('idCliente')
            this.ngOnInit();
          },
          error => {
            this.estatus = "error";
            this.mensaje = "Error al Actualizar cliente"
            localStorage.removeItem('idCliente')
          }
        )
      }
    )
  }

}
