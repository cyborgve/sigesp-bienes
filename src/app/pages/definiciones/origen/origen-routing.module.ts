import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrigenComponent } from './origen.component';

const routes: Routes = [
  {
    path: '',
    component: OrigenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrigenRoutingModule {}
