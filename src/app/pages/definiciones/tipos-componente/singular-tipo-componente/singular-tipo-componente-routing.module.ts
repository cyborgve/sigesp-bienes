import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularTipoComponenteComponent } from './singular-tipo-componente.component';

const routes: Routes = [
  { path: '', component: SingularTipoComponenteComponent },
  { path: ':id', component: SingularTipoComponenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularTipoComponenteRoutingModule {}
