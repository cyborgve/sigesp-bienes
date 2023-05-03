import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstructuraPredominanteComponent } from './estructura-predominante.component';

const routes: Routes = [
  {
    path: '',
    component: EstructuraPredominanteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstructuraPredominanteRoutingModule {}
