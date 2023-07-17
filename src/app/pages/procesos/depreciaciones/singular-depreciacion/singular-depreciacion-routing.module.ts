import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularDepreciacionComponent } from './singular-depreciacion.component';

const routes: Routes = [{ path: '', component: SingularDepreciacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularDepreciacionRoutingModule {}
