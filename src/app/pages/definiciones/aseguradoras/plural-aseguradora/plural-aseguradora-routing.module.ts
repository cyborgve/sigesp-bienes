import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralAseguradoraComponent } from './plural-aseguradora.component';

const routes: Routes = [{ path: '', component: PluralAseguradoraComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralAseguradoraRoutingModule {}
