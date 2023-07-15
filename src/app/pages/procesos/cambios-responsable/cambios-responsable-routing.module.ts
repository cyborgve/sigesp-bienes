import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './plural-cambio-responsable/plural-cambio-responsable.module'
      ).then(m => m.PluralCambioResponsableModule),
  },
  {
    path: 'cambio-responsable',
    loadChildren: () =>
      import(
        './singular-cambio-responsable/singular-cambio-responsable.module'
      ).then(m => m.SingularCambioResponsableModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiosResponsableRoutingModule {}
