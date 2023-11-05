import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaActasPrestamoComponent } from './lista-actas-prestamo.component';

const routes: Routes = [{ path: '', component: ListaActasPrestamoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaActasPrestamoRoutingModule {}
