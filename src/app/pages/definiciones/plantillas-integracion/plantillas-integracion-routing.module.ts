import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './plural-plantilla-integracion/plural-plantilla-integracion.module'
      ).then(m => m.PluralPlantillaIntegracionModule),
  },
  {
    path: 'plantilla-integracion',
    loadChildren: () =>
      import(
        './singular-plantilla-integracion/singular-plantilla-integracion.module'
      ).then(m => m.SingularPlantillaIntegracionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantillasIntegracionRoutingModule {}
