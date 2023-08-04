import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralCatalogoGeneralComponent } from './plural-catalogo-general.component';

const routes: Routes = [
  { path: '', component: PluralCatalogoGeneralComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralCatalogoGeneralRoutingModule {}
