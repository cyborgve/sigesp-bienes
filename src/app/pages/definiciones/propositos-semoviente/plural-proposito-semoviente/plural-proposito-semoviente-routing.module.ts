import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralPropositoSemovienteComponent } from './plural-proposito-semoviente.component';

const routes: Routes = [
  { path: '', component: PluralPropositoSemovienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralPropositoSemovienteRoutingModule {}
