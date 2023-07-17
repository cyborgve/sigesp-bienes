import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralRetornoComponent } from './plural-retorno.component';

const routes: Routes = [{ path: '', component: PluralRetornoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralRetornoRoutingModule {}
