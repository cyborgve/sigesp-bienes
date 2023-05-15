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
    path: 'activo-componentes',
    loadChildren: () =>
      import('./activo-componente/activo-componente.module').then(
        m => m.ActivoComponenteModule
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinicionesRoutingModule {}
