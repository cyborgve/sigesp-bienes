import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralComponenteComponent } from './plural-componente.component';

const routes: Routes = [{ path: '', component: PluralComponenteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralComponenteRoutingModule {}
