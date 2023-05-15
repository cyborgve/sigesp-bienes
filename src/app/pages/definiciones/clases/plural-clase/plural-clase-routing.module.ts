import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralClaseComponent } from './plural-clase.component';

const routes: Routes = [{ path: '', component: PluralClaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralClaseRoutingModule {}
