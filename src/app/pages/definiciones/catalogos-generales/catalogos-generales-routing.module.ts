import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-catalogo-general/plural-catalogo-general.module').then(
        m => m.PluralCatalogoGeneralModule
      ),
  },
  {
    path: 'catalogo-general',
    loadChildren: () =>
      import(
        './singular-catalogo-general/singular-catalogo-general.module'
      ).then(m => m.SingularCatalogoGeneralModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogosGeneralesRoutingModule {}
