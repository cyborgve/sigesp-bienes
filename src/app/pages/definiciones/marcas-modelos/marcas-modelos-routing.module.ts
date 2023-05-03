import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarcasModelosComponent } from './marcas-modelos.component';

const routes: Routes = [
  {
    path: '',
    component: MarcasModelosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcasModelosRoutingModule {}
