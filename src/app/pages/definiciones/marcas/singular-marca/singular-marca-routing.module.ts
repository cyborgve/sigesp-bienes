import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularMarcaComponent } from './singular-marca.component';

const routes: Routes = [
  { path: '', component: SingularMarcaComponent },
  { path: ':id', component: SingularMarcaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularMarcaRoutingModule {}
