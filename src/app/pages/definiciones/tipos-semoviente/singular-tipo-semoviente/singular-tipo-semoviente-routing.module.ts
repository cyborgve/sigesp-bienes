import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularTipoSemovienteComponent } from './singular-tipo-semoviente.component';

const routes: Routes = [
  { path: '', component: SingularTipoSemovienteComponent },
  { path: ':id', component: SingularTipoSemovienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularTipoSemovienteRoutingModule {}
