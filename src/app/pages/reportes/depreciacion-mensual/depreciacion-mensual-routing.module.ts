import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepreciacionMensualComponent } from './depreciacion-mensual.component';

const routes: Routes = [{ path: '', component: DepreciacionMensualComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepreciacionMensualRoutingModule {}
