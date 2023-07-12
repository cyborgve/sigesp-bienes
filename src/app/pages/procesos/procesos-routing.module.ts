import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcesosComponent } from './procesos.component';

const routes: Routes = [
  {
    path: '',
    component: ProcesosComponent,
  },
  {
    path: 'incorporaciones',
    loadChildren: () =>
      import('./incorporaciones/incorporaciones.module').then(
        m => m.IncorporacionesModule
      ),
  },
  {
    path: 'desincorporaciones',
    loadChildren: () =>
      import('./desincorporaciones/desincorporaciones.module').then(
        m => m.DesincorporacionesModule
      ),
  },
  {
    path: 'reasignaciones',
    loadChildren: () =>
      import('./reasignaciones/reasignaciones.module').then(
        m => m.ReasignacionesModule
      ),
  },
  {
    path: 'modificaciones',
    loadChildren: () =>
      import('./modificaciones/modificaciones.module').then(
        m => m.ModificacionesModule
      ),
  },
  {
    path: 'cambio-responsable',
    loadChildren: () =>
      import('./cambio-responsable/cambio-responsable.module').then(
        m => m.CambioResponsableModule
      ),
  },
  {
    path: 'entrega-unidad',
    loadChildren: () =>
      import('./entrega-unidad/entrega-unidad.module').then(
        m => m.EntregaUnidadModule
      ),
  },
  {
    path: 'acta-prestamo',
    loadChildren: () =>
      import('./acta-prestamo/acta-prestamo.module').then(
        m => m.ActaPrestamoModule
      ),
  },
  {
    path: 'autorizacion-salida',
    loadChildren: () =>
      import('./autorizacion-salida/autorizacion-salida.module').then(
        m => m.AutorizacionSalidaModule
      ),
  },
  {
    path: 'retorno-activo',
    loadChildren: () =>
      import('./retorno-activo/retorno-activo.module').then(
        m => m.RetornoActivoModule
      ),
  },
  {
    path: 'depreciacion-activo',
    loadChildren: () =>
      import('./depreciacion-activo/depreciacion-activo.module').then(
        m => m.DepreciacionActivoModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcesosRoutingModule {}
