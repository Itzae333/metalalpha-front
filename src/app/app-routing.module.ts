
import { ModuleWithProviders } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AdministradorComponent } from "./components/administrador/administrador.component";
import { ClienteComponent } from "./components/cliente/cliente.component";
import { ErrorComponent } from "./components/error/error.component";
import { HomeComponent } from "./components/home/home.component";
import { InventarioComponent } from "./components/inventario/inventario.component";
import { LoginComponent } from "./components/login/login.component";
import { PagoComponent } from "./components/pago/pago.component";
import { ProductoComponent } from "./components/producto/producto.component";
import { RegistroventasComponent } from "./components/registroventas/registroventas.component";
import { TicketComponent } from "./components/ticket/ticket.component";
import { VentaComponent } from "./components/venta/venta.component";




const appRoutes: Routes = [
  {path:'',component:LoginComponent},
  {path:'inicio',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'logout/:sure',component:LoginComponent},
  {path:'producto',component:ProductoComponent},
  {path:'inventario',component:InventarioComponent},
  {path:'venta',component:VentaComponent},
  {path:'registro-venta',component:RegistroventasComponent},
  {path:'cliente',component:ClienteComponent},
  {path:'pago',component:PagoComponent},
  {path:'administrador',component:AdministradorComponent},
  {path:'ticket',component:TicketComponent},
  {path:'*',component:ErrorComponent},
];

export const appRoutingProviders:any[]=[]; //Activa la navegacion SPA
export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);//Carga el servicio de navegacion
