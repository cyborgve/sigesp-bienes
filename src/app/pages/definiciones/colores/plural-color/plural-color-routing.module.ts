import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralColorComponent } from './plural-color.component';

const routes: Routes = [{ path: '', component: PluralColorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralColorRoutingModule {}
