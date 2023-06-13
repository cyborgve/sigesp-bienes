import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularPlantillaDepreciacionComponent } from './singular-plantilla-depreciacion.component';

const routes: Routes = [
  { path: '', component: SingularPlantillaDepreciacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularPlantillaDepreciacionRoutingModule {}
