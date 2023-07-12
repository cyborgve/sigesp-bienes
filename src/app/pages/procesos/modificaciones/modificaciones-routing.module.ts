import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModificacionesComponent } from './modificaciones.component';

const routes: Routes = [{ path: '', component: ModificacionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificacionesRoutingModule {}
