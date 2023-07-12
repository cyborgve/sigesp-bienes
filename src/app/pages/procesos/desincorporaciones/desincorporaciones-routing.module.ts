import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesincorporacionesComponent } from './desincorporaciones.component';

const routes: Routes = [{ path: '', component: DesincorporacionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesincorporacionesRoutingModule {}
