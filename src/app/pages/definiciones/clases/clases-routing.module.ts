import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-clase/plural-clase.module').then(
        m => m.PluralClaseModule
      ),
  },
  {
    path: 'clase',
    loadChildren: () =>
      import('./singular-clase/singular-clase.module').then(
        m => m.SingularClaseModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasesRoutingModule {}
