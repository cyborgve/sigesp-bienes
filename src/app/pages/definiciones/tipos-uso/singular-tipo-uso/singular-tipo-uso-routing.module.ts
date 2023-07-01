import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularTipoUsoComponent } from './singular-tipo-uso.component';

const routes: Routes = [{ path: '', component: SingularTipoUsoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularTipoUsoRoutingModule {}
