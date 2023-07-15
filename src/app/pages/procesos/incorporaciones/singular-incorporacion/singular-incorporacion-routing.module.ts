import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularIncorporacionComponent } from './singular-incorporacion.component';

const routes: Routes = [
  { path: '', component: SingularIncorporacionComponent },
  { path: ':id', component: SingularIncorporacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularIncorporacionRoutingModule {}
