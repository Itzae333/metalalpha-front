import { Component, DoCheck, OnInit } from '@angular/core';
import { Usuario } from './models/usuario';
import { isEmptyObject } from 'jquery';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService]
})
export class AppComponent implements DoCheck {
  title = 'metalalpha_web';
  public usuario: any;
  public nivel: any;
  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.loadUsuario();
    this.nivel = "";
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


}
