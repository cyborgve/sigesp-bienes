import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDepreciacionesComponent } from './lista-depreciaciones.component';

const routes: Routes = [{ path: '', component: ListaDepreciacionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDepreciacionesRoutingModule {}
