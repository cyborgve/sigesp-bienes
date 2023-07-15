import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularDepreciacionActivoComponent } from './singular-depreciacion-activo.component';

const routes: Routes = [
  { path: '', component: SingularDepreciacionActivoComponent },
  { path: ':id', component: SingularDepreciacionActivoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularDepreciacionActivoRoutingModule {}
