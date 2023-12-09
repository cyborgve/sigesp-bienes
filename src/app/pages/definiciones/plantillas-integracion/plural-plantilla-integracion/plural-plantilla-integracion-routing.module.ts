import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralPlantillaIntegracionComponent } from './plural-plantilla-integracion.component';

const routes: Routes = [
  { path: '', component: PluralPlantillaIntegracionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralPlantillaIntegracionRoutingModule {}
