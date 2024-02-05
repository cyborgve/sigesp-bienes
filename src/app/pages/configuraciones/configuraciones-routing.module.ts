import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionesComponent } from './configuraciones.component';
import { UsuarioSigespGuard } from '@core/guards/usuario-sigesp.guard';

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
  {
    path: 'incorporaciones-migradas',
    loadChildren: () =>
      import('./incorporaciones-migradas/incorporaciones-migradas.module').then(
        m => m.IncorporacionesMigradasModule
      ),
    canActivate: [UsuarioSigespGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionesRoutingModule {}
