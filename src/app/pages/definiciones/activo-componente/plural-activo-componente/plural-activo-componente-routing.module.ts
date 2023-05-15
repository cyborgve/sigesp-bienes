import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralActivoComponenteComponent } from './plural-activo-componente.component';

const routes: Routes = [
  { path: '', component: PluralActivoComponenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralActivoComponenteRoutingModule {}
