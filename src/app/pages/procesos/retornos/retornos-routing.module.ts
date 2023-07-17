import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-retorno/plural-retorno.module').then(
        m => m.PluralRetornoModule
      ),
  },
  {
    path: 'retorno',
    loadChildren: () =>
      import('./singular-retorno/singular-retorno.module').then(
        m => m.SingularRetornoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetornosRoutingModule {}
