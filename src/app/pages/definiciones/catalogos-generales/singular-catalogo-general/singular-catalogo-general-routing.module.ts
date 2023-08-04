import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularCatalogoGeneralComponent } from './singular-catalogo-general.component';

const routes: Routes = [
  { path: '', component: SingularCatalogoGeneralComponent },
  { path: ':id', component: SingularCatalogoGeneralComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularCatalogoGeneralRoutingModule {}
