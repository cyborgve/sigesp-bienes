import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefinicionesBasicasComponent } from './definiciones-basicas.component';

const routes: Routes = [
  {
    path: '',
    component: DefinicionesBasicasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefinicionesBasicasRoutingModule {}
