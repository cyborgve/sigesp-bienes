import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralReasignacionComponent } from './plural-reasignacion.component';

const routes: Routes = [{ path: '', component: PluralReasignacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralReasignacionRoutingModule {}
