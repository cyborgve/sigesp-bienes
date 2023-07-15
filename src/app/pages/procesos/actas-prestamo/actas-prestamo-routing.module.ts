import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-acta-prestamo/plural-acta-prestamo.module').then(
        m => m.PluralActaPrestamoModule
      ),
  },
  {
    path: 'acta-prestamo',
    loadChildren: () =>
      import('./singular-acta-prestamo/singular-acta-prestamo.module').then(
        m => m.SingularActaPrestamoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActasPrestamoRoutingModule {}
