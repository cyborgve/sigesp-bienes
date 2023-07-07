import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularComponenteComponent } from './singular-componente.component';

const routes: Routes = [
  { path: '', component: SingularComponenteComponent },
  { path: ':id', component: SingularComponenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularComponenteRoutingModule {}
