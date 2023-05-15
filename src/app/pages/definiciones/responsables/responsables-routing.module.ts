import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-responsable/plural-responsable.module').then(
        m => m.PluralResponsableModule
      ),
  },
  {
    path: 'responsable',
    loadChildren: () =>
      import('./singular-responsable/singular-responsable.module').then(
        m => m.SingularResponsableModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponsablesRoutingModule {}
