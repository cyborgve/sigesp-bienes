import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-reasignacion/plural-reasignacion.module').then(
        m => m.PluralReasignacionModule
      ),
  },
  {
    path: 'reasignacion',
    loadChildren: () =>
      import('./singular-reasignacion/singular-reasignacion.module').then(
        m => m.SingularReasignacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReasignacionesRoutingModule {}
