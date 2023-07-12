import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActaPrestamoComponent } from './acta-prestamo.component';

const routes: Routes = [{ path: '', component: ActaPrestamoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActaPrestamoRoutingModule {}
