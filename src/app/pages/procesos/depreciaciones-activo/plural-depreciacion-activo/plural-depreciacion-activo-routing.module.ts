import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralDepreciacionActivoComponent } from './plural-depreciacion-activo.component';

const routes: Routes = [
  { path: '', component: PluralDepreciacionActivoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralDepreciacionActivoRoutingModule {}
