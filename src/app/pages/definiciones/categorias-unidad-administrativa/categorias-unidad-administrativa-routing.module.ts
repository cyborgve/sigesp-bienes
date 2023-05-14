import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './plural-categoria-unidad-administrativa/plural-categoria-unidad-administrativa.module'
      ).then(m => m.PluralCategoriaUnidadAdministrativaModule),
  },
  {
    path: 'categoria-unidad-administrativa',
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
export class CategoriasUnidadAdministrativaRoutingModule {}
