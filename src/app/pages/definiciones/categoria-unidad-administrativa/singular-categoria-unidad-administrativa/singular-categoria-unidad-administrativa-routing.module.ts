import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularCategoriaUnidadAdministrativaComponent } from './singular-categoria-unidad-administrativa.component';

const routes: Routes = [
  {
    path: '',
    component: SingularCategoriaUnidadAdministrativaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularCategoriaUnidadAdministrativaRoutingModule {}
