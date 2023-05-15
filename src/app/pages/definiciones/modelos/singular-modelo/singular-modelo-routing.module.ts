import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularModeloComponent } from './singular-modelo.component';

const routes: Routes = [
  { path: '', component: SingularModeloComponent },
  { path: ':id', component: SingularModeloComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularModeloRoutingModule {}
