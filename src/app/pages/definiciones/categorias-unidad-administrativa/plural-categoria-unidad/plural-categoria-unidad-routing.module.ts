import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralCategoriaUnidadComponent } from './plural-categoria-unidad.component';

const routes: Routes = [
  { path: '', component: PluralCategoriaUnidadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralCategoriaUnidadRoutingModule {}
