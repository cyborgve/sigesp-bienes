import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralModeloComponent } from './plural-modelo.component';

const routes: Routes = [{ path: '', component: PluralModeloComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralModeloRoutingModule {}
