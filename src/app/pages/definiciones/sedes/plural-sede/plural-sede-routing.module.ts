import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralSedeComponent } from './plural-sede.component';

const routes: Routes = [{ path: '', component: PluralSedeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralSedeRoutingModule {}
