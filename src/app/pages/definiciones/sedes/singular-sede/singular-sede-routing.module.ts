import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularSedeComponent } from './singular-sede.component';

const routes: Routes = [
  { path: '', component: SingularSedeComponent },
  { path: ':id', component: SingularSedeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularSedeRoutingModule {}
