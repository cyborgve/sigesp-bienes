import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularActivoComponenteComponent } from './singular-activo-componente.component';

const routes: Routes = [
  { path: '', component: SingularActivoComponenteComponent },
  { path: ':id', component: SingularActivoComponenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularActivoComponenteRoutingModule {}
