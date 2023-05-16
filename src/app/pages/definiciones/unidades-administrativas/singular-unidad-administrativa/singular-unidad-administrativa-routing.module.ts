import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularUnidadAdministrativaComponent } from './singular-unidad-administrativa.component';

const routes: Routes = [
  { path: '', component: SingularUnidadAdministrativaComponent },
  { path: ':id', component: SingularUnidadAdministrativaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularUnidadAdministrativaRoutingModule {}
