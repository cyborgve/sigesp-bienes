import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReasignacionesComponent } from './reasignaciones.component';

const routes: Routes = [{ path: '', component: ReasignacionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReasignacionesRoutingModule {}
