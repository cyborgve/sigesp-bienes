import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralIntegracionComponent } from './plural-integracion.component';

const routes: Routes = [{ path: '', component: PluralIntegracionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralIntegracionRoutingModule {}
