import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralIncorporacionComponent } from './plural-incorporacion.component';

const routes: Routes = [{ path: '', component: PluralIncorporacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralIncorporacionRoutingModule {}
