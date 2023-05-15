import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './plural-estado-conservacion/plural-estado-conservacion.module'
      ).then(m => m.PluralEstadoConservacionModule),
  },
  {
    path: 'estado-conservacion',
    loadChildren: () =>
      import(
        './singular-estado-conservacion/singular-estado-conservacion.module'
      ).then(m => m.SingularEstadoConservacionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadosConservacionRoutingModule {}
