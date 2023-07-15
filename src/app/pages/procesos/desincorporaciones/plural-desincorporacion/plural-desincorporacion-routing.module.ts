import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralDesincorporacionComponent } from './plural-desincorporacion.component';

const routes: Routes = [
  { path: '', component: PluralDesincorporacionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralDesincorporacionRoutingModule {}
