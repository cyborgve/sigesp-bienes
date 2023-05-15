import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-tipo-componente/plural-tipo-componente.module').then(
        m => m.PluralTipoComponenteModule
      ),
  },
  {
    path: 'tipo-componente',
    loadChildren: () =>
      import('./singular-tipo-componente/singular-tipo-componente.module').then(
        m => m.SingularTipoComponenteModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposComponenteRoutingModule {}
