import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-incorporacion/plural-incorporacion.module').then(
        m => m.PluralIncorporacionModule
      ),
  },
  {
    path: 'incorporacion',
    loadChildren: () =>
      import('./singular-incorporacion/singular-incorporacion.module').then(
        m => m.SingularIncorporacionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncorporacionesRoutingModule {}
