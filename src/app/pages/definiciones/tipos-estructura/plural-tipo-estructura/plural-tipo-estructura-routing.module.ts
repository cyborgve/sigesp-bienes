import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralTipoEstructuraComponent } from './plural-tipo-estructura.component';

const routes: Routes = [{ path: '', component: PluralTipoEstructuraComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralTipoEstructuraRoutingModule {}
