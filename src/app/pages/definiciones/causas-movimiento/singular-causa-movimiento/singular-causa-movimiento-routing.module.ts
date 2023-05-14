import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularCausaMovimientoComponent } from './singular-causa-movimiento.component';

const routes: Routes = [
  { path: '', component: SingularCausaMovimientoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularCausaMovimientoRoutingModule {}
