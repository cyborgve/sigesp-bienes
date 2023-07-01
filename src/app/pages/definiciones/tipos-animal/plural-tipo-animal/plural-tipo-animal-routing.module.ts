import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralTipoAnimalComponent } from './plural-tipo-animal.component';

const routes: Routes = [{ path: '', component: PluralTipoAnimalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralTipoAnimalRoutingModule {}
