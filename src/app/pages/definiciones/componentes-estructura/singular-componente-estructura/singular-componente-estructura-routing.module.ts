import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularComponenteEstructuraComponent } from './singular-componente-estructura.component';

const routes: Routes = [
  { path: '', component: SingularComponenteEstructuraComponent },
  { path: ':id', component: SingularComponenteEstructuraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularComponenteEstructuraRoutingModule {}
