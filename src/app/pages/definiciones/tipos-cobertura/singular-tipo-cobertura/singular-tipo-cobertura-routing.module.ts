import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularTipoCoberturaComponent } from './singular-tipo-cobertura.component';

const routes: Routes = [
  { path: '', component: SingularTipoCoberturaComponent },
  { path: ':id', component: SingularTipoCoberturaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularTipoCoberturaRoutingModule {}
