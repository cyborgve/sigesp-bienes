import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralRetornoActivoComponent } from './plural-retorno-activo.component';

const routes: Routes = [{ path: '', component: PluralRetornoActivoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralRetornoActivoRoutingModule {}
