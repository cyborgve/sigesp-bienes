import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularComponenteActivoComponent } from './singular-componente-activo.component';

const routes: Routes = [
  { path: '', component: SingularComponenteActivoComponent },
  { path: ':id', component: SingularComponenteActivoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularComponenteActivoRoutingModule {}
