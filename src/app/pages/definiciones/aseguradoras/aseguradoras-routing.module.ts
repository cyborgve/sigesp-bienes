import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-aseguradora/plural-aseguradora.module').then(
        m => m.PluralAseguradoraModule
      ),
  },
  {
    path: 'aseguradora',
    loadChildren: () =>
      import('./singular-aseguradora/singular-aseguradora.module').then(
        m => m.SingularAseguradoraModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AseguradorasRoutingModule {}
