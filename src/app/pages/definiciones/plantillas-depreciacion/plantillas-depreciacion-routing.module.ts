import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import(
        './plural-plantilla-depreciacion/plural-plantilla-depreciacion.module'
      ).then(m => m.PluralPlantillaDepreciacionModule),
  },
  {
    path: 'plantilla-depreciacion',
    loadChildren: () =>
      import(
        './singular-plantilla-depreciacion/singular-plantilla-depreciacion.module'
      ).then(m => m.SingularPlantillaDepreciacionModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantillasDepreciacionRoutingModule {}
