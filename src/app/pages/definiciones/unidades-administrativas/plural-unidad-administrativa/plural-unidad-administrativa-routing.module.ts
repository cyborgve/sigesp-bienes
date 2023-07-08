import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralUnidadAdministrativaComponent } from './plural-unidad-administrativa.component';

const routes: Routes = [
  { path: '', component: PluralUnidadAdministrativaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralUnidadAdministrativaRoutingModule {}
