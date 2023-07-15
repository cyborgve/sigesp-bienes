import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularDesincorporacionComponent } from './singular-desincorporacion.component';

const routes: Routes = [
  { path: '', component: SingularDesincorporacionComponent },
  { path: ':id', component: SingularDesincorporacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularDesincorporacionRoutingModule {}
