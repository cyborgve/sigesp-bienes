import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralUsoComponent } from './plural-uso.component';

const routes: Routes = [{ path: '', component: PluralUsoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralUsoRoutingModule {}
