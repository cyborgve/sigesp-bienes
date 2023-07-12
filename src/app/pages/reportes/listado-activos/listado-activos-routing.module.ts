import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoActivosComponent } from './listado-activos.component';

const routes: Routes = [{ path: '', component: ListadoActivosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoActivosRoutingModule {}
