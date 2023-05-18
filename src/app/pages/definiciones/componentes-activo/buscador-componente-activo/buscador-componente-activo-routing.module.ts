import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponenteActivoComponent } from './buscador-componente-activo.component';

const routes: Routes = [
  { path: '', component: BuscadorComponenteActivoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorComponenteActivoRoutingModule {}
