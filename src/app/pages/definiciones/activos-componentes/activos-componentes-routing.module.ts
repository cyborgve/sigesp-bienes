import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-componente/plural-componente.module').then(
        m => m.PluralComponenteModule
      ),
  },
  {
    path: 'activos-componente',
    loadChildren: () =>
      import('./singular-componente/singular-componente.module').then(
        m => m.SingularComponenteModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivosComponentesRoutingModule {}
