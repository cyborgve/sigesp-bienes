import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncorporacionesComponent } from './incorporaciones.component';

const routes: Routes = [{ path: '', component: IncorporacionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncorporacionesRoutingModule {}
