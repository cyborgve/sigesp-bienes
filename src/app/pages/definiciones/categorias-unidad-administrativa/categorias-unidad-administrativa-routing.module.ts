import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-categoria-unidad/plural-categoria-unidad.module').then(
        m => m.PluralCategoriaUnidadModule
      ),
  },
  {
    path: 'categoria-unidad-administrativa',
    loadChildren: () =>
      import(
        './singular-categoria-unidad/singular-categoria-unidad.module'
      ).then(m => m.SingularCategoriaUnidadModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasUnidadAdministrativaRoutingModule {}
