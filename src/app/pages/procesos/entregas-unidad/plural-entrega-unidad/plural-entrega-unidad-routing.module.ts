import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralEntregaUnidadComponent } from './plural-entrega-unidad.component';

const routes: Routes = [{ path: '', component: PluralEntregaUnidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralEntregaUnidadRoutingModule {}
