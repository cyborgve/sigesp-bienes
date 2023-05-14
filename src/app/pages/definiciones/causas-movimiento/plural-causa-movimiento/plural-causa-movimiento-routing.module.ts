import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralCausaMovimientoComponent } from './plural-causa-movimiento.component';

const routes: Routes = [
  { path: '', component: PluralCausaMovimientoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralCausaMovimientoRoutingModule {}
