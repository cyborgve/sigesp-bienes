import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularModificacionComponent } from './singular-modificacion.component';

const routes: Routes = [
  { path: ':id', component: SingularModificacionComponent },
  { path: '', component: SingularModificacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularModificacionRoutingModule {}
