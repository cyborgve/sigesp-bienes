import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularActivoComponent } from './singular-activo.component';

const routes: Routes = [
  { path: '', component: SingularActivoComponent },
  { path: ':id', component: SingularActivoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularActivoRoutingModule {}
