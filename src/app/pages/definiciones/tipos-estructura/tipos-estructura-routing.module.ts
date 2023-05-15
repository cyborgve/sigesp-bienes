import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-tipo-estructura/plural-tipo-estructura.module').then(
        m => m.PluralTipoEstructuraModule
      ),
  },
  {
    path: 'tipo-estructura',
    loadChildren: () =>
      import('./singular-tipo-estructura/singular-tipo-estructura.module').then(
        m => m.SingularTipoEstructuraModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposEstructuraRoutingModule {}
