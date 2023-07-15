import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-entrega-unidad/plural-entrega-unidad.module').then(
        m => m.PluralEntregaUnidadModule
      ),
  },
  {
    path: 'entrega-unidad',
    loadChildren: () =>
      import('./singular-entrega-unidad/singular-entrega-unidad.module').then(
        m => m.SingularEntregaUnidadModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregasUnidadRoutingModule {}
