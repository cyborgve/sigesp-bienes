import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-modelo/plural-modelo.module').then(
        m => m.PluralModeloModule
      ),
  },
  {
    path: 'modelo',
    loadChildren: () =>
      import('./singular-modelo/singular-modelo.module').then(
        m => m.SingularModeloModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelosRoutingModule {}
