import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-retorno-activo/plural-retorno-activo.module').then(
        m => m.PluralRetornoActivoModule
      ),
  },
  {
    path: 'retorno-activo',
    loadChildren: () =>
      import('./singular-retorno-activo/singular-retorno-activo.module').then(
        m => m.SingularRetornoActivoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetornosActivoRoutingModule {}
