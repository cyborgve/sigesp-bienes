import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularCategoriaUnidadComponent } from './singular-categoria-unidad.component';

const routes: Routes = [
  { path: '', component: SingularCategoriaUnidadComponent },
  { path: ':id', component: SingularCategoriaUnidadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularCategoriaUnidadRoutingModule {}
