import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularUsoComponent } from './singular-uso.component';

const routes: Routes = [
  { path: '', component: SingularUsoComponent },
  { path: ':id', component: SingularUsoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularUsoRoutingModule {}
