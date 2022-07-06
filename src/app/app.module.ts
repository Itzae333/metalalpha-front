import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing,appRoutingProviders } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { VentaComponent } from './components/venta/venta.component';
import { ProductoComponent } from './components/producto/producto.component';
import { RegistroventasComponent } from './components/registroventas/registroventas.component';
import { PagoComponent } from './components/pago/pago.component';
import { TicketComponent } from './components/ticket/ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    InventarioComponent,
    ClienteComponent,
    VentaComponent,
    ProductoComponent,
    RegistroventasComponent,
    PagoComponent,
    TicketComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
