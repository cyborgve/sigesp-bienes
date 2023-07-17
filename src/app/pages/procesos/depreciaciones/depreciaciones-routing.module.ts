import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-depreciacion/plural-depreciacion.module').then(
        m => m.PluralDepreciacionModule
      ),
  },
  {
    path: 'depreciacion',
    loadChildren: () =>
      import('./singular-depreciacion/singular-depreciacion.module').then(
        m => m.SingularDepreciacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepreciacionesRoutingModule {}
