import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./plural-raza/plural-raza.module').then(m => m.PluralRazaModule),
  },
  {
    path: 'raza',
    loadChildren: () =>
      import('./singular-raza/singular-raza.module').then(
        m => m.SingularRazaModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RazasRoutingModule {}
