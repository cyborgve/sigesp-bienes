import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaUnidadAdministrativaComponent } from './categoria-unidad-administrativa.component';

const routes: Routes = [
  { path: '', component: CategoriaUnidadAdministrativaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaUnidadAdministrativaRoutingModule {}
