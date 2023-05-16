import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralTipoPolizaComponent } from './plural-tipo-poliza.component';

const routes: Routes = [{ path: '', component: PluralTipoPolizaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralTipoPolizaRoutingModule {}
