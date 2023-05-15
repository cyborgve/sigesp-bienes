import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-seguro/plural-seguro.module').then(
        m => m.PluralSeguroModule
      ),
  },
  {
    path: 'seguro',
    loadChildren: () =>
      import('./singular-seguro/singular-seguro.module').then(
        m => m.SingularSeguroModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SegurosRoutingModule {}
