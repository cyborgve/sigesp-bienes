import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-marca/plural-marca.module').then(
        m => m.PluralMarcaModule
      ),
  },
  {
    path: 'marcas',
    loadChildren: () =>
      import('./singular-marca/singular-marca.module').then(
        m => m.SingularMarcaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcasRoutingModule {}
