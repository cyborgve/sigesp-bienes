import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularTipoAnimalComponent } from './singular-tipo-animal.component';

const routes: Routes = [
  { path: '', component: SingularTipoAnimalComponent },
  { path: ':id', component: SingularTipoAnimalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularTipoAnimalRoutingModule {}
