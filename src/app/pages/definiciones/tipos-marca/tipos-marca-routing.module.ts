import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-tipo-marca/plural-tipo-marca.module').then(
        m => m.PluralTipoMarcaModule
      ),
  },
  {
    path: 'tipo-marca',
    loadChildren: () =>
      import('./singular-tipo-marca/singular-tipo-marca.module').then(
        m => m.SingularTipoMarcaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposMarcaRoutingModule {}
