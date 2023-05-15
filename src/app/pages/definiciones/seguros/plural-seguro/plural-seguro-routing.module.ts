import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralSeguroComponent } from './plural-seguro.component';

const routes: Routes = [{ path: '', component: PluralSeguroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralSeguroRoutingModule {}
