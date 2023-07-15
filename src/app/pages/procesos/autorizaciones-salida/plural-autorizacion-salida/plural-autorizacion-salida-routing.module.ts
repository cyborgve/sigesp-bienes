import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralAutorizacionSalidaComponent } from './plural-autorizacion-salida.component';

const routes: Routes = [
  { path: '', component: PluralAutorizacionSalidaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralAutorizacionSalidaRoutingModule {}
