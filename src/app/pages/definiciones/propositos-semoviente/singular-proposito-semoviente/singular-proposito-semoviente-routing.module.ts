import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularPropositoSemovienteComponent } from './singular-proposito-semoviente.component';

const routes: Routes = [
  { path: '', component: SingularPropositoSemovienteComponent },
  { path: ':id', component: SingularPropositoSemovienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularPropositoSemovienteRoutingModule {}
