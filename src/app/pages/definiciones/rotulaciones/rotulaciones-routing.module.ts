import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-rotulacion/plural-rotulacion.module').then(
        m => m.PluralRotulacionModule
      ),
  },
  {
    path: 'rotulacion',
    loadChildren: () =>
      import('./singular-rotulacion/singular-rotulacion.module').then(
        m => m.SingularRotulacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RotulacionesRoutingModule {}
