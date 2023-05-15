import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-condicion-compra/plural-condicion-compra.module').then(
        m => m.PluralCondicionCompraModule
      ),
  },
  {
    path: 'condicion-compra',
    loadChildren: () =>
      import(
        './singular-condicion-compra/singular-condicion-compra.module'
      ).then(m => m.SingularCondicionCompraModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CondicionesCompraRoutingModule {}
