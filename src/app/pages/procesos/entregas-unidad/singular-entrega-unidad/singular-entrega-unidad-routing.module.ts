import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularEntregaUnidadComponent } from './singular-entrega-unidad.component';

const routes: Routes = [
  { path: '', component: SingularEntregaUnidadComponent },
  { path: ':id', component: SingularEntregaUnidadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularEntregaUnidadRoutingModule {}
