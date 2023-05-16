import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-tipo-sede/plural-tipo-sede.module').then(
        m => m.PluralTipoSedeModule
      ),
  },
  {
    path: 'tipo-sede',
    loadChildren: () =>
      import('./singular-tipo-sede/singular-tipo-sede.module').then(
        m => m.SingularTipoSedeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposSedeRoutingModule {}
