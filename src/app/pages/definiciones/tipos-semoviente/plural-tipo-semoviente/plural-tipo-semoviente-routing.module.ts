import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralTipoSemovienteComponent } from './plural-tipo-semoviente.component';

const routes: Routes = [{ path: '', component: PluralTipoSemovienteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralTipoSemovienteRoutingModule {}
