import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralDepreciacionComponent } from './plural-depreciacion.component';

const routes: Routes = [{ path: '', component: PluralDepreciacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralDepreciacionRoutingModule {}
