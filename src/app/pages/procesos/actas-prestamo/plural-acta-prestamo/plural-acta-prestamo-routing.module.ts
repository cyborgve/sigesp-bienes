import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralActaPrestamoComponent } from './plural-acta-prestamo.component';

const routes: Routes = [{ path: '', component: PluralActaPrestamoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralActaPrestamoRoutingModule {}
