import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-correlativo/plural-correlativo.module').then(
        m => m.PluralCorrelativoModule
      ),
  },
  {
    path: 'correlativo',
    loadChildren: () =>
      import('./singular-correlativo/singular-correlativo.module').then(
        m => m.SingularCorrelativoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorrelativosRoutingModule {}
