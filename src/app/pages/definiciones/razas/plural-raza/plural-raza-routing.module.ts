import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralRazaComponent } from './plural-raza.component';

const routes: Routes = [{ path: '', component: PluralRazaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralRazaRoutingModule {}
