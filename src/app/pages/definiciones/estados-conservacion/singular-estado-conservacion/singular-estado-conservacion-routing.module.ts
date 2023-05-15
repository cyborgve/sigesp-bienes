import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularEstadoConservacionComponent } from './singular-estado-conservacion.component';

const routes: Routes = [
  { path: '', component: SingularEstadoConservacionComponent },
  { path: ':id', component: SingularEstadoConservacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularEstadoConservacionRoutingModule {}
