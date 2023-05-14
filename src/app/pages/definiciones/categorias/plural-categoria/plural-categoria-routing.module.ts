import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralCategoriaComponent } from './plural-categoria.component';

const routes: Routes = [{ path: '', component: PluralCategoriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralCategoriaRoutingModule {}
