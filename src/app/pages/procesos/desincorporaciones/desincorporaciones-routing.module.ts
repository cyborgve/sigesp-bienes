import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-desincorporacion/plural-desincorporacion.module').then(
        m => m.PluralDesincorporacionModule
      ),
  },
  {
    path: 'desincorporacion',
    loadChildren: () =>
      import(
        './singular-desincorporacion/singular-desincorporacion.module'
      ).then(m => m.SingularDesincorporacionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesincorporacionesRoutingModule {}
