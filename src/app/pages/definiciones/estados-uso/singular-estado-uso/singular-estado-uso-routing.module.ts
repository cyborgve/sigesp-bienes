import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularEstadoUsoComponent } from './singular-estado-uso.component';

const routes: Routes = [
  { path: '', component: SingularEstadoUsoComponent },
  { path: ':id', component: SingularEstadoUsoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularEstadoUsoRoutingModule {}
