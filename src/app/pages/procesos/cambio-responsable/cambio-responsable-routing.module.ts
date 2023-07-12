import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambioResponsableComponent } from './cambio-responsable.component';

const routes: Routes = [{ path: '', component: CambioResponsableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioResponsableRoutingModule {}
