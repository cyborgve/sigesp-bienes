import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-uso/plural-uso.module').then(m => m.PluralUsoModule),
  },
  {
    path: 'uso',
    loadChildren: () =>
      import('./singular-uso/singular-uso.module').then(
        m => m.SingularUsoModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsosRoutingModule {}
