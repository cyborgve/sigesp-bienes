import { SingularCategoriaUnidadAdministrativaComponent } from './singular-categoria-unidad-administrativa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SingularCategoriaUnidadAdministrativaComponent,
  },
  {
    path: ':id',
    component: SingularCategoriaUnidadAdministrativaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularCategoriaUnidadAdministrativaRoutingModule {}
