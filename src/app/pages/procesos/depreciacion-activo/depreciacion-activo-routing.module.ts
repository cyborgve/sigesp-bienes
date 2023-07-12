import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepreciacionActivoComponent } from './depreciacion-activo.component';

const routes: Routes = [{ path: '', component: DepreciacionActivoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepreciacionActivoRoutingModule {}
