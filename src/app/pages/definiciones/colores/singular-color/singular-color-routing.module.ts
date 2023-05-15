import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularColorComponent } from './singular-color.component';

const routes: Routes = [
  { path: '', component: SingularColorComponent },
  { path: ':id', component: SingularColorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularColorRoutingModule {}
