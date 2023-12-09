import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularPlantillaIntegracionComponent } from './singular-plantilla-integracion.component';

const routes: Routes = [
  { path: '', component: SingularPlantillaIntegracionComponent },
  { path: ':id', component: SingularPlantillaIntegracionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularPlantillaIntegracionRoutingModule {}
