import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivoComponenteComponent } from './activo-componente.component';

const routes: Routes = [
  { path: '', component: ActivoComponenteComponent },
  { path: ':id', component: ActivoComponenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivoComponenteRoutingModule {}
