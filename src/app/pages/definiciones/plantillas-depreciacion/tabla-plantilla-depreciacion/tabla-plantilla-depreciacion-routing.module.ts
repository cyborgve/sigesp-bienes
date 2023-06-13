import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaPlantillaDepreciacionComponent } from './tabla-plantilla-depreciacion.component';

const routes: Routes = [
  { path: '', component: TablaPlantillaDepreciacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaPlantillaDepreciacionRoutingModule {}
