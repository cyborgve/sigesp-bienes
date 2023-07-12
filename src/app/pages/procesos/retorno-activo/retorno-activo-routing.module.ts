import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetornoActivoComponent } from './retorno-activo.component';

const routes: Routes = [{ path: '', component: RetornoActivoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetornoActivoRoutingModule {}
