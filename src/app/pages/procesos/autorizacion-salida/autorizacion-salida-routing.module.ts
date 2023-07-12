import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizacionSalidaComponent } from './autorizacion-salida.component';

const routes: Routes = [{ path: '', component: AutorizacionSalidaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutorizacionSalidaRoutingModule {}
