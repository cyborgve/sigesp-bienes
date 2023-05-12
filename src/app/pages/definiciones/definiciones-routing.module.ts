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
    path: 'categoria-unidad-administrativa',
    loadChildren: () =>
      import(
        './categoria-unidad-administrativa/categoria-unidad-administrativa.module'
      ).then(m => m.CategoriaUnidadAdministrativaModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinicionesRoutingModule {}
