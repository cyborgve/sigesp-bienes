import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefinicionesComponent } from './definiciones.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DefinicionesComponent },
  {
    path: 'configuracion-bienes',
    loadChildren: () =>
      import(
        '@pages/definiciones/configuracion-bienes/configuracion-bienes.module'
      ).then(m => m.ConfiguracionBienesModule),
  },
  {
    path: 'catalogo-general',
    loadChildren: () =>
      import(
        '@pages/definiciones/catalogo-general/catalogo-general.module'
      ).then(m => m.CatalogoGeneralModule),
  },
  {
    path: 'causa-movimiento',
    loadChildren: () =>
      import(
        '@pages/definiciones/causa-movimiento/causa-movimiento.module'
      ).then(m => m.CausaMovimientoModule),
  },
  {
    path: 'estructura-predominante',
    loadChildren: () =>
      import(
        '@pages/definiciones/estructura-predominante/estructura-predominante.module'
      ).then(m => m.EstructuraPredominanteModule),
  },
  {
    path: 'sede',
    loadChildren: () =>
      import('@pages/definiciones/sede/sede.module').then(m => m.SedeModule),
  },
  {
    path: 'origen',
    loadChildren: () =>
      import('@pages/definiciones/origen/origen.module').then(
        m => m.OrigenModule
      ),
  },
  {
    path: 'bien-activo',
    loadChildren: () =>
      import('@pages/definiciones/activo/activo.module').then(
        m => m.ActivoModule
      ),
  },
  {
    path: 'marcas-modelos',
    loadChildren: () =>
      import('@pages/definiciones/marcas-modelos/marcas-modelos.module').then(
        m => m.MarcasModelosModule
      ),
  },
  {
    path: 'unidad-administrativa',
    loadChildren: () =>
      import(
        '@pages/definiciones/unidad-administrativa/unidad-administrativa.module'
      ).then(m => m.UnidadAdministrativaModule),
  },
  {
    path: 'definiciones-basicas',
    loadChildren: () =>
      import(
        '@pages/definiciones/definiciones-basicas/definiciones-basicas.module'
      ).then(m => m.DefinicionesBasicasModule),
  },
  {
    path: 'seguro',
    loadChildren: () =>
      import('@pages/definiciones/seguros/seguros.module').then(
        m => m.SegurosModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class DefinicionesRoutingModule {}
