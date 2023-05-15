import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-activo-componente/plural-activo-componente.module').then(
        m => m.PluralActivoComponenteModule
      ),
  },
  {
    path: 'activo-componente',
    loadChildren: () =>
      import(
        './singular-activo-componente/singular-activo-componente.module'
      ).then(m => m.SingularActivoComponenteModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivoComponenteRoutingModule {}
