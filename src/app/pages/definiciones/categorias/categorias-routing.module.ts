import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-categoria/plural-categoria.module').then(
        m => m.PluralCategoriaModule
      ),
  },
  {
    path: 'categoria',
    loadChildren: () =>
      import('./singular-categoria/singular-categoria.module').then(
        m => m.SingularCategoriaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
