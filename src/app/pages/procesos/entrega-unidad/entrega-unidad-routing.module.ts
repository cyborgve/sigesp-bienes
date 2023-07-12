import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntregaUnidadComponent } from './entrega-unidad.component';

const routes: Routes = [{ path: '', component: EntregaUnidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregaUnidadRoutingModule {}
