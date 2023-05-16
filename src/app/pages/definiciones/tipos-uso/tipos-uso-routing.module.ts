import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-tipo-uso/plural-tipo-uso.module').then(
        m => m.PluralTipoUsoModule
      ),
  },
  {
    path: 'tipo-uso',
    loadChildren: () =>
      import('./singular-tipo-uso/singular-tipo-uso.module').then(
        m => m.SingularTipoUsoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposUsoRoutingModule {}
