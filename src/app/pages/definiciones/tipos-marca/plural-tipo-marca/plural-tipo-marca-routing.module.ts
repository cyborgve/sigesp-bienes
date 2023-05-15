import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralTipoMarcaComponent } from './plural-tipo-marca.component';

const routes: Routes = [{ path: '', component: PluralTipoMarcaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralTipoMarcaRoutingModule {}
