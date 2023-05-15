import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-sede/plural-sede.module').then(m => m.PluralSedeModule),
  },
  {
    path: 'sede',
    loadChildren: () =>
      import('./singular-sede/singular-sede.module').then(
        m => m.SingularSedeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SedesRoutingModule {}
