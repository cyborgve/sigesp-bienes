import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorCategoriaUnidadComponent } from './buscador-categoria-unidad.component';

const routes: Routes = [
  { path: '', component: BuscadorCategoriaUnidadComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorCategoriaUnidadRoutingModule {}
