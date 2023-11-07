import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaInventarioActivosComponent } from './lista-inventario-activos.component';

const routes: Routes = [
  { path: '', component: ListaInventarioActivosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaInventarioActivosRoutingModule {}
