import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularClaseComponent } from './singular-clase.component';

const routes: Routes = [
  { path: '', component: SingularClaseComponent },
  { path: ':id', component: SingularClaseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularClaseRoutingModule {}
