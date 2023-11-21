import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './reportes.component';

const routes: Routes = [
  { path: '', component: ReportesComponent },
  {
    path: 'lista-actas-prestamo',
    loadChildren: () =>
      import('./lista-actas-prestamo/lista-actas-prestamo.module').then(
        m => m.ListaActasPrestamoModule
      ),
  },
  {
    path: 'lista-depreciaciones-anuales',
    loadChildren: () =>
      import(
        './lista-depreciaciones-anuales/lista-depreciaciones-anuales.module'
      ).then(m => m.ListaDepreciacionesAnualesModule),
  },
  {
    path: 'lista-depreciaciones-mensuales',
    loadChildren: () =>
      import(
        './lista-depreciaciones-mensuales/lista-depreciaciones-mensuales.module'
      ).then(m => m.ListaDepreciacionesMensualesModule),
  },
  {
    path: 'lista-activos',
    loadChildren: () =>
      import('./lista-activos/lista-activos.module').then(
        m => m.ListaActivosModule
      ),
  },
  {
    path: 'lista-inventario-activos',
    loadChildren: () =>
      import('./lista-inventario-activos/lista-inventario-activos.module').then(
        m => m.ListaInventarioActivosModule
      ),
  },
  {
    path: 'lista-depreciaciones',
    loadChildren: () =>
      import('./lista-depreciaciones/lista-depreciaciones.module').then(
        m => m.ListaDepreciacionesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
