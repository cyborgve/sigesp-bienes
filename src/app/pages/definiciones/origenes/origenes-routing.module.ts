import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-origen/plural-origen.module').then(
        m => m.PluralOrigenModule
      ),
  },
  {
    path: 'origen',
    loadChildren: () =>
      import('./singular-origen/singular-origen.module').then(
        m => m.SingularOrigenModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrigenesRoutingModule {}
