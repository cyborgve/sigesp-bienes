import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularOrigenComponent } from './singular-origen.component';

const routes: Routes = [
  { path: '', component: SingularOrigenComponent },
  { path: ':id', component: SingularOrigenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularOrigenRoutingModule {}
