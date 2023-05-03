import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionBienesComponent } from './configuracion-bienes.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionBienesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionBienesRoutingModule {}
