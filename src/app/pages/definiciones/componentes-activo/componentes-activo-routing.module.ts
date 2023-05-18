import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-componente-activo/plural-componente-activo.module').then(
        m => m.PluralComponenteActivoModule
      ),
  },
  {
    path: 'componente-activo',
    loadChildren: () =>
      import(
        './singular-componente-activo/singular-componente-activo.module'
      ).then(m => m.SingularComponenteActivoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentesActivoRoutingModule {}
