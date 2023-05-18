import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralComponenteActivoComponent } from './plural-componente-activo.component';

const routes: Routes = [
  { path: '', component: PluralComponenteActivoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralComponenteActivoRoutingModule {}
