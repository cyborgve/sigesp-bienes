import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-tipo-semoviente/plural-tipo-semoviente.module').then(
        m => m.PluralTipoSemovienteModule
      ),
  },
  {
    path: 'tipo-semoviente',
    loadChildren: () =>
      import('./singular-tipo-semoviente/singular-tipo-semoviente.module').then(
        m => m.SingularTipoSemovienteModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposSemovienteRoutingModule {}
