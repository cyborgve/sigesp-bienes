import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesComponent } from './reportes.component';

const routes: Routes = [
  { path: '', component: ReportesComponent },
  {
    path: 'listado-activos',
    loadChildren: () =>
      import('./listado-activos/listado-activos.module').then(
        m => m.ListadoActivosModule
      ),
  },
  {
    path: 'actas',
    loadChildren: () => import('./actas/actas.module').then(m => m.ActasModule),
  },
  {
    path: 'depreciacion',
    loadChildren: () =>
      import('./depreciacion/depreciacion.module').then(
        m => m.DepreciacionModule
      ),
  },
  {
    path: 'depreciacion-mensual',
    loadChildren: () =>
      import('./depreciacion-mensual/depreciacion-mensual.module').then(
        m => m.DepreciacionMensualModule
      ),
  },
  {
    path: 'inventario-activos',
    loadChildren: () =>
      import('./inventario-activos/inventario-activos.module').then(
        m => m.InventarioActivosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesRoutingModule {}
