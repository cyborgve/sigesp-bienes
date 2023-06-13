import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefinicionesComponent } from './definiciones.component';

const routes: Routes = [
  {
    path: '',
    component: DefinicionesComponent,
  },
  {
    path: 'aseguradoras',
    loadChildren: () =>
      import('./aseguradoras/aseguradoras.module').then(
        m => m.AseguradorasModule
      ),
  },
  {
    path: 'categorias-unidad-administrativa',
    loadChildren: () =>
      import(
        './categorias-unidad-administrativa/categorias-unidad-administrativa.module'
      ).then(m => m.CategoriasUnidadAdministrativaModule),
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./categorias/categorias.module').then(m => m.CategoriasModule),
  },
  {
    path: 'causas-movimiento',
    loadChildren: () =>
      import('./causas-movimiento/causas-movimiento.module').then(
        m => m.CausasMovimientoModule
      ),
  },
  {
    path: 'clases',
    loadChildren: () =>
      import('./clases/clases.module').then(m => m.ClasesModule),
  },
  {
    path: 'colores',
    loadChildren: () =>
      import('./colores/colores.module').then(m => m.ColoresModule),
  },
  {
    path: 'componentes-estructura',
    loadChildren: () =>
      import('./componentes-estructura/componentes-estructura.module').then(
        m => m.ComponentesEstructuraModule
      ),
  },
  {
    path: 'condiciones-compra',
    loadChildren: () =>
      import('./condiciones-compra/condiciones-compra.module').then(
        m => m.CondicionesCompraModule
      ),
  },
  {
    path: 'configuraciones',
    loadChildren: () =>
      import('./configuraciones/configuraciones.module').then(
        m => m.ConfiguracionesModule
      ),
  },
  {
    path: 'estados-conservacion',
    loadChildren: () =>
      import('./estados-conservacion/estados-conservacion.module').then(
        m => m.EstadosConservacionModule
      ),
  },
  {
    path: 'estados-uso',
    loadChildren: () =>
      import('./estados-uso/estados-uso.module').then(m => m.EstadosUsoModule),
  },
  {
    path: 'marcas',
    loadChildren: () =>
      import('./marcas/marcas.module').then(m => m.MarcasModule),
  },
  {
    path: 'modelos',
    loadChildren: () =>
      import('./modelos/modelos.module').then(m => m.ModelosModule),
  },
  {
    path: 'origenes',
    loadChildren: () =>
      import('./origenes/origenes.module').then(m => m.OrigenesModule),
  },
  {
    path: 'propositos-semoviente',
    loadChildren: () =>
      import('./propositos-semoviente/propositos-semoviente.module').then(
        m => m.PropositosSemovienteModule
      ),
  },
  {
    path: 'razas',
    loadChildren: () => import('./razas/razas.module').then(m => m.RazasModule),
  },
  {
    path: 'responsables',
    loadChildren: () =>
      import('./responsables/responsables.module').then(
        m => m.ResponsablesModule
      ),
  },
  {
    path: 'rotulaciones',
    loadChildren: () =>
      import('./rotulaciones/rotulaciones.module').then(
        m => m.RotulacionesModule
      ),
  },
  {
    path: 'sedes',
    loadChildren: () => import('./sedes/sedes.module').then(m => m.SedesModule),
  },
  {
    path: 'seguros',
    loadChildren: () =>
      import('./seguros/seguros.module').then(m => m.SegurosModule),
  },
  {
    path: 'tipos-cobertura',
    loadChildren: () =>
      import('./tipos-cobertura/tipos-cobertura.module').then(
        m => m.TiposCoberturaModule
      ),
  },
  {
    path: 'tipos-componente',
    loadChildren: () =>
      import('./tipos-componente/tipos-componente.module').then(
        m => m.TiposComponenteModule
      ),
  },
  {
    path: 'tipos-estructura',
    loadChildren: () =>
      import('./tipos-estructura/tipos-estructura.module').then(
        m => m.TiposEstructuraModule
      ),
  },
  {
    path: 'tipos-poliza',
    loadChildren: () =>
      import('./tipos-poliza/tipos-poliza.module').then(
        m => m.TiposPolizaModule
      ),
  },
  {
    path: 'tipos-sede',
    loadChildren: () =>
      import('./tipos-sede/tipos-sede.module').then(m => m.TiposSedeModule),
  },
  {
    path: 'tipos-semoviente',
    loadChildren: () =>
      import('./tipos-semoviente/tipos-semoviente.module').then(
        m => m.TiposSemovienteModule
      ),
  },
  {
    path: 'unidades-administrativas',
    loadChildren: () =>
      import('./unidades-administrativas/unidades-administrativas.module').then(
        m => m.UnidadesAdministrativasModule
      ),
  },
  {
    path: 'activos',
    loadChildren: () =>
      import('./activos/activos.module').then(m => m.ActivosModule),
  },
  {
    path: 'componentes-activo',
    loadChildren: () =>
      import('./componentes-activo/componentes-activo.module').then(
        m => m.ComponentesActivoModule
      ),
  },
  {
    path: 'tipos-marca',
    loadChildren: () =>
      import('./tipos-marca/tipos-marca.module').then(m => m.TiposMarcaModule),
  },
  {
    path: 'usos',
    loadChildren: () => import('./usos/usos.module').then(m => m.UsosModule),
  },
  {
    path: 'plantillas-depreciacion',
    loadChildren: () =>
      import('./plantillas-depreciacion/plantillas-depreciacion.module').then(
        m => m.PlantillasDepreciacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinicionesRoutingModule {}
