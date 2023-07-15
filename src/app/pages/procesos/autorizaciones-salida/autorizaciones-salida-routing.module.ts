import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './plural-autorizacion-salida/plural-autorizacion-salida.module'
      ).then(m => m.PluralAutorizacionSalidaModule),
  },
  {
    path: 'autorizacion-salida',
    loadChildren: () =>
      import(
        './singular-autorizacion-salida/singular-autorizacion-salida.module'
      ).then(m => m.SingularAutorizacionSalidaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorizacionesSalidaRoutingModule {}
