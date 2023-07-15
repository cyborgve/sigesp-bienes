import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './plural-depreciacion-activo/plural-depreciacion-activo.module'
      ).then(m => m.PluralDepreciacionActivoModule),
  },
  {
    path: 'depreciacion-activo',
    loadChildren: () =>
      import(
        './singular-depreciacion-activo/singular-depreciacion-activo.module'
      ).then(m => m.SingularDepreciacionActivoModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepreciacionesActivoRoutingModule {}
