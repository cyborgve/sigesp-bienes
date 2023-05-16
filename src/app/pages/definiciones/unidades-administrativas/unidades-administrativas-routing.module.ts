import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './plural-unidad-administrativa/plural-unidad-administrativa.module'
      ).then(m => m.PluralUnidadAdministrativaModule),
  },
  {
    path: 'unidad-administrativa',
    loadChildren: () =>
      import(
        './singular-unidad-administrativa/singular-unidad-administrativa.module'
      ).then(m => m.SingularUnidadAdministrativaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadesAdministrativasRoutingModule {}
