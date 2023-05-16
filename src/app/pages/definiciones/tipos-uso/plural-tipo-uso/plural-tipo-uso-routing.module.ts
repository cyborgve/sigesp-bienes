import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralTipoUsoComponent } from './plural-tipo-uso.component';

const routes: Routes = [{ path: '', component: PluralTipoUsoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralTipoUsoRoutingModule {}
