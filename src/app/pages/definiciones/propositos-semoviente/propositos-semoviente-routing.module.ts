import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        '../propositos-semoviente/plural-proposito-semoviente/plural-proposito-semoviente.module'
      ).then(m => m.PluralPropositoSemovienteModule),
  },
  {
    path: 'proposito-semoviente',
    loadChildren: () =>
      import(
        '../propositos-semoviente/singular-proposito-semoviente/singular-proposito-semoviente.module'
      ).then(m => m.SingularPropositoSemovienteModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropositosSemovienteRoutingModule {}
