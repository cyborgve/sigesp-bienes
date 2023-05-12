import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './singular-categoria-unidad-administrativa/singular-categoria-unidad-administrativa.module'
      ).then(m => m.SingularCategoriaUnidadAdministrativaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaUnidadAdministrativaRoutingModule {}
