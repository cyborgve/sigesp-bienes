import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularRetornoActivoComponent } from './singular-retorno-activo.component';

const routes: Routes = [
  { path: '', component: SingularRetornoActivoComponent },
  { path: ':id', component: SingularRetornoActivoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularRetornoActivoRoutingModule {}
