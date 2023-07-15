import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralCambioResponsableComponent } from './plural-cambio-responsable.component';

const routes: Routes = [
  { path: '', component: PluralCambioResponsableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralCambioResponsableRoutingModule {}
