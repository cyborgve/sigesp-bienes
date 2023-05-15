import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-estado-uso/plural-estado-uso.module').then(
        m => m.PluralEstadoUsoModule
      ),
  },
  {
    path: 'estado-uso',
    loadChildren: () =>
      import('./singular-estado-uso/singular-estado-uso.module').then(
        m => m.SingularEstadoUsoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadosUsoRoutingModule {}
