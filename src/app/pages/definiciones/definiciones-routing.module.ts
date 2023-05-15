import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefinicionesComponent } from './definiciones.component';

const routes: Routes = [
  {
    path: '',
    component: DefinicionesComponent,
  },
  {
    path: 'activo-componentes',
    loadChildren: () =>
      import('./activo-componentes/activo-componentes.module').then(
        m => m.ActivoComponentesModule
      ),
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinicionesRoutingModule {}
