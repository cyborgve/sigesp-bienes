import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcesosComponent } from './procesos.component';

const routes: Routes = [
  {
    path: '',
    component: ProcesosComponent,
  },
  {
    path: 'actas-prestamo',
    loadChildren: () =>
      import('./actas-prestamo/actas-prestamo.module').then(
        m => m.ActasPrestamoModule
      ),
  },
  {
    path: 'autorizaciones-salida',
    loadChildren: () =>
      import('./autorizaciones-salida/autorizaciones-salida.module').then(
        m => m.AutorizacionesSalidaModule
      ),
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
    path: 'cambios-responsable',
    loadChildren: () =>
      import('./cambios-responsable/cambios-responsable.module').then(
        m => m.CambiosResponsableModule
      ),
  },
  {
    path: 'entregas-unidad',
    loadChildren: () =>
      import('./entregas-unidad/entregas-unidad.module').then(
        m => m.EntregasUnidadModule
      ),
  },
  {
    path: 'depreciaciones',
    loadChildren: () =>
      import('./depreciaciones/depreciaciones.module').then(
        m => m.DepreciacionesModule
      ),
  },
  {
    path: 'retornos',
    loadChildren: () =>
      import('./retornos/retornos.module').then(m => m.RetornosModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcesosRoutingModule {}
