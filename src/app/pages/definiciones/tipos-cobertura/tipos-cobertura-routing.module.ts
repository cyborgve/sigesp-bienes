import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-tipo-cobertura/plural-tipo-cobertura.module').then(
        m => m.PluralTipoCoberturaModule
      ),
  },
  {
    path: 'tipo-cobertura',
    loadChildren: () =>
      import('./singular-tipo-cobertura/singular-tipo-cobertura.module').then(
        m => m.SingularTipoCoberturaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposCoberturaRoutingModule {}
