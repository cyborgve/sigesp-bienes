import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-causa-movimiento/plural-causa-movimiento.module').then(
        m => m.PluralCausaMovimientoModule
      ),
  },
  {
    path: 'causa-movimiento',
    loadChildren: () =>
      import(
        './singular-causa-movimiento/singular-causa-movimiento.module'
      ).then(m => m.SingularCausaMovimientoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CausasMovimientoRoutingModule {}
