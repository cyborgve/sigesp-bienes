import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralTipoSedeComponent } from './plural-tipo-sede.component';

const routes: Routes = [{ path: '', component: PluralTipoSedeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralTipoSedeRoutingModule {}
