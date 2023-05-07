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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinicionesRoutingModule {}
