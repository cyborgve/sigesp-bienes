import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularRazaComponent } from './singular-raza.component';

const routes: Routes = [
  { path: '', component: SingularRazaComponent },
  { path: ':id', component: SingularRazaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularRazaRoutingModule {}
