import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-tipo-poliza/plural-tipo-poliza.module').then(
        m => m.PluralTipoPolizaModule
      ),
  },
  {
    path: 'tipo-poliza',
    loadChildren: () =>
      import('./singular-tipo-poliza/singular-tipo-poliza.module').then(
        m => m.SingularTipoPolizaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposPolizaRoutingModule {}
