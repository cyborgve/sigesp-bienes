import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralEstadoConservacionComponent } from './plural-estado-conservacion.component';

const routes: Routes = [
  { path: '', component: PluralEstadoConservacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralEstadoConservacionRoutingModule {}
