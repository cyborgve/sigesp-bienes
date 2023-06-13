import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularRotulacionComponent } from './singular-rotulacion.component';

const routes: Routes = [
  { path: '', component: SingularRotulacionComponent },
  { path: ':id', component: SingularRotulacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularRotulacionRoutingModule {}
