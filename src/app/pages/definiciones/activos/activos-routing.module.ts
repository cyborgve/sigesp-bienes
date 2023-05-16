import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-activo/plural-activo.module').then(
        m => m.PluralActivoModule
      ),
  },
  {
    path: 'activo',
    loadChildren: () =>
      import('./singular-activo/singular-activo.module').then(
        m => m.SingularActivoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivosRoutingModule {}
