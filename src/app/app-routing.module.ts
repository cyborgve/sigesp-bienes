import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'definiciones',
    loadChildren: () =>
      import('@pages/definiciones/definiciones.module').then(
        m => m.DefinicionesModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('@pages/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'procesos',
    loadChildren: () =>
      import('@pages/procesos/procesos.module').then(m => m.ProcesosModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'reportes',
    loadChildren: () =>
      import('@pages/reportes/reportes.module').then(m => m.ReportesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'configuraciones',
    loadChildren: () =>
      import('./pages/configuraciones/configuraciones.module').then(
        m => m.ConfiguracionesModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
