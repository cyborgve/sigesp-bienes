import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralRotulacionComponent } from './plural-rotulacion.component';

const routes: Routes = [{ path: '', component: PluralRotulacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralRotulacionRoutingModule {}
