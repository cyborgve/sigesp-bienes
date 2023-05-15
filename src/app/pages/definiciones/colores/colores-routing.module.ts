import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-color/plural-color.module').then(
        m => m.PluralColorModule
      ),
  },
  {
    path: 'color',
    loadChildren: () =>
      import('./singular-color/singular-color.module').then(
        m => m.SingularColorModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColoresRoutingModule {}
