import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularRetornoComponent } from './singular-retorno.component';

const routes: Routes = [{ path: '', component: SingularRetornoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularRetornoRoutingModule {}
