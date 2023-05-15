import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularTipoEstructuraComponent } from './singular-tipo-estructura.component';

const routes: Routes = [
  { path: '', component: SingularTipoEstructuraComponent },
  { path: ':id', component: SingularTipoEstructuraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularTipoEstructuraRoutingModule {}
