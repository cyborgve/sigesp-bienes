import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularSeguroComponent } from './singular-seguro.component';

const routes: Routes = [
  { path: '', component: SingularSeguroComponent },
  { path: ':id', component: SingularSeguroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularSeguroRoutingModule {}
