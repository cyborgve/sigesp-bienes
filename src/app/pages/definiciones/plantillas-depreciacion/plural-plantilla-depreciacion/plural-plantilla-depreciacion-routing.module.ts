import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralPlantillaDepreciacionComponent } from './plural-plantilla-depreciacion.component';

const routes: Routes = [
  { path: '', component: PluralPlantillaDepreciacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralPlantillaDepreciacionRoutingModule {}
