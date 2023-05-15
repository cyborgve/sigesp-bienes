import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralTipoCoberturaComponent } from './plural-tipo-cobertura.component';

const routes: Routes = [{ path: '', component: PluralTipoCoberturaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralTipoCoberturaRoutingModule {}
