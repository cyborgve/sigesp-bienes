import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularResponsableComponent } from './singular-responsable.component';

const routes: Routes = [
  { path: '', component: SingularResponsableComponent },
  { path: ':id', component: SingularResponsableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularResponsableRoutingModule {}
