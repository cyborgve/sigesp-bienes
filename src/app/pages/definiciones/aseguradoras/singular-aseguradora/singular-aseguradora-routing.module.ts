import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularAseguradoraComponent } from './singular-aseguradora.component';

const routes: Routes = [
  { path: '', component: SingularAseguradoraComponent },
  { path: ':id', component: SingularAseguradoraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularAseguradoraRoutingModule {}
