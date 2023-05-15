import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralComponenteEstructuraComponent } from './plural-componente-estructura.component';

const routes: Routes = [
  { path: '', component: PluralComponenteEstructuraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralComponenteEstructuraRoutingModule {}
