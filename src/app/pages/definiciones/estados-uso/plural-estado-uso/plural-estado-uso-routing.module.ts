import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralEstadoUsoComponent } from './plural-estado-uso.component';

const routes: Routes = [{ path: '', component: PluralEstadoUsoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralEstadoUsoRoutingModule {}
