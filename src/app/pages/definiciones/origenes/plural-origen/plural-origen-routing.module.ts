import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralOrigenComponent } from './plural-origen.component';

const routes: Routes = [{ path: '', component: PluralOrigenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralOrigenRoutingModule {}
