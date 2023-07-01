import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-tipo-animal/plural-tipo-animal.module').then(
        m => m.PluralTipoAnimalModule
      ),
  },
  {
    path: 'tipo-animal',
    loadChildren: () =>
      import('./singular-tipo-animal/singular-tipo-animal.module').then(
        m => m.SingularTipoAnimalModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposAnimalRoutingModule {}
