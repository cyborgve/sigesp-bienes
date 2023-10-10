import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionesComponent } from './configuraciones.component';

const routes: Routes = [
  { path: '', component: ConfiguracionesComponent },
  {
    path: 'configuracion-general',
    loadChildren: () =>
      import('./configuracion-general/configuracion-general.module').then(
        m => m.ConfiguracionGeneralModule
      ),
  },
  {
    path: 'correlativos',
    loadChildren: () =>
      import('./correlativos/correlativos.module').then(
        m => m.CorrelativosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionesRoutingModule {}
