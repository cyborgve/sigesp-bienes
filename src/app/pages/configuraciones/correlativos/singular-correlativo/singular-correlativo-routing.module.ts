import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularCorrelativoComponent } from './singular-correlativo.component';

const routes: Routes = [
  { path: '', component: SingularCorrelativoComponent },
  { path: ':id', component: SingularCorrelativoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularCorrelativoRoutingModule {}
