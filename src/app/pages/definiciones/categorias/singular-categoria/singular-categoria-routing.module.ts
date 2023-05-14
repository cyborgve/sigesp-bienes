import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularCategoriaComponent } from './singular-categoria.component';

const routes: Routes = [
  { path: '', component: SingularCategoriaComponent },
  { path: ':id', component: SingularCategoriaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularCategoriaRoutingModule {}
