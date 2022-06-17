import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Fabrica } from 'src/app/models/fabrica';
import { Nivel_Usuario } from 'src/app/models/nivel_usuario';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit {

  public usuario:Usuario;
  public fabrica:Fabrica;
  public nivelUsuario:Nivel_Usuario;
  public identity:any;

  constructor(
    private _usuarioService:UsuarioService,
    private _router:Router,
    private _route:ActivatedRoute
  ) { 
    this.fabrica=new Fabrica(0,true,'');
    this.nivelUsuario=new Nivel_Usuario(0,true,'');
    this.usuario=new Usuario(0,true,'','','','','',this.fabrica,this.nivelUsuario)
  }

  ngOnInit(): void {
    this.logout();
  }

  login(form:any){
    this._usuarioService.login(this.usuario.usuario,this.usuario.password).subscribe(
      data=>{
        localStorage.setItem('usuario',JSON.stringify(data));
        this._router.navigate(['inicio'])
      }
    )
  }

  logout(){
    this._route.params.subscribe(params=>{
      let logout=+params['sure'];
      if(logout==1){
        localStorage.removeItem('usuario');
        this.identity=null;

        this._router.navigate([''])
      }
    })
  }



}
