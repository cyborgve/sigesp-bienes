import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivoComponent } from './activo.component';

const routes: Routes = [
  {
    path: '',
    component: ActivoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivoRoutingModule {}
