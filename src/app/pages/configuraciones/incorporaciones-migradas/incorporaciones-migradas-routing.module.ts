import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncorporacionesMigradasComponent } from './incorporaciones-migradas.component';

const routes: Routes = [
  { path: '', component: IncorporacionesMigradasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncorporacionesMigradasRoutingModule {}
