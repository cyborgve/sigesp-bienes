import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './plural-componente-estructura/plural-componente-estructura.module'
      ).then(m => m.PluralComponenteEstructuraModule),
  },
  {
    path: 'componente-estructura',
    loadChildren: () =>
      import(
        './singular-componente-estructura/singular-componente-estructura.module'
      ).then(m => m.SingularComponenteEstructuraModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentesEstructuraRoutingModule {}
