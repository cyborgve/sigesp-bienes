import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioActivosComponent } from './inventario-activos.component';

const routes: Routes = [{ path: '', component: InventarioActivosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioActivosRoutingModule {}
