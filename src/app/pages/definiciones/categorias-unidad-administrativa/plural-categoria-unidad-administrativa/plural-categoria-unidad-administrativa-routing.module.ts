import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralCategoriaUnidadAdministrativaComponent } from './plural-categoria-unidad-administrativa.component';

const routes: Routes = [
  {
    path: '',
    component: PluralCategoriaUnidadAdministrativaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralCategoriaUnidadAdministrativaRoutingModule {}
