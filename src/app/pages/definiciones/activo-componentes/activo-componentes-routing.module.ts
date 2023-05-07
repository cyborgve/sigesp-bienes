import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivoComponentesComponent } from './activo-componentes.component';

const routes: Routes = [
  { path: '', component: ActivoComponentesComponent },
  {
    path: 'activo-componente',
    loadChildren: () =>
      import('./activo-componente/activo-componente.module').then(
        m => m.ActivoComponenteModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivoComponentesRoutingModule {}
