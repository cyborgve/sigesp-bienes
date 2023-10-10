import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionGeneralComponent } from './configuracion-general.component';

const routes: Routes = [{ path: '', component: ConfiguracionGeneralComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguracionGeneralRoutingModule {}
