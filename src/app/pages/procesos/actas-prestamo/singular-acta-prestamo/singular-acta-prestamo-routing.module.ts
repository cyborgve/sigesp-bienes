import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularActaPrestamoComponent } from './singular-acta-prestamo.component';

const routes: Routes = [
  { path: '', component: SingularActaPrestamoComponent },
  { path: ':id', component: SingularActaPrestamoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularActaPrestamoRoutingModule {}
