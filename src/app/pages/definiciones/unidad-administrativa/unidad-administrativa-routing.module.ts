import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadAdministrativaComponent } from './unidad-administrativa.component';

const routes: Routes = [
  {
    path: '',
    component: UnidadAdministrativaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadAdministrativaRoutingModule {}
