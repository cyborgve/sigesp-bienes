import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularReasignacionComponent } from './singular-reasignacion.component';

const routes: Routes = [
  { path: '', component: SingularReasignacionComponent },
  { path: ':id', component: SingularReasignacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularReasignacionRoutingModule {}
