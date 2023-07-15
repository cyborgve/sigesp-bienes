import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularAutorizacionSalidaComponent } from './singular-autorizacion-salida.component';

const routes: Routes = [
  { path: '', component: SingularAutorizacionSalidaComponent },
  { path: ':id', component: SingularAutorizacionSalidaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularAutorizacionSalidaRoutingModule {}
