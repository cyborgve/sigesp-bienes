import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CausaMovimientoComponent } from './causa-movimiento.component';

const routes: Routes = [
  {
    path: '',
    component: CausaMovimientoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CausaMovimientoRoutingModule {}
