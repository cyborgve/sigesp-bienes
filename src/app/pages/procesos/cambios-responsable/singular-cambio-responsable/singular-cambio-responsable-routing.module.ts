import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularCambioResponsableComponent } from './singular-cambio-responsable.component';

const routes: Routes = [
  { path: '', component: SingularCambioResponsableComponent },
  { path: ':id', component: SingularCambioResponsableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularCambioResponsableRoutingModule {}
