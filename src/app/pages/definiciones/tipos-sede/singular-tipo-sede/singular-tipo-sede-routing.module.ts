import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularTipoSedeComponent } from './singular-tipo-sede.component';

const routes: Routes = [
  { path: '', component: SingularTipoSedeComponent },
  { path: ':id', component: SingularTipoSedeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularTipoSedeRoutingModule {}
