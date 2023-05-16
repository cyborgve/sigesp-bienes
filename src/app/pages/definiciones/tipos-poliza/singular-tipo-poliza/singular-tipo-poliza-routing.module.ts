import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularTipoPolizaComponent } from './singular-tipo-poliza.component';

const routes: Routes = [
  { path: '', component: SingularTipoPolizaComponent },
  { path: ':id', component: SingularTipoPolizaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularTipoPolizaRoutingModule {}
