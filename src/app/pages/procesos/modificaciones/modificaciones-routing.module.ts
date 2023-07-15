import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-modificacion/plural-modificacion.module').then(
        m => m.PluralModificacionModule
      ),
  },
  {
    path: 'modificacion',
    loadChildren: () =>
      import('./singular-modificacion/singular-modificacion.module').then(
        m => m.SingularModificacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificacionesRoutingModule {}
