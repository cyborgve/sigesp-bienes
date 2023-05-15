import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralTipoComponenteComponent } from './plural-tipo-componente.component';

const routes: Routes = [{ path: '', component: PluralTipoComponenteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralTipoComponenteRoutingModule {}
