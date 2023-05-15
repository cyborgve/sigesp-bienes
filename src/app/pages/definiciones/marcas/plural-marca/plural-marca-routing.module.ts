import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralMarcaComponent } from './plural-marca.component';

const routes: Routes = [{ path: '', component: PluralMarcaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralMarcaRoutingModule {}
