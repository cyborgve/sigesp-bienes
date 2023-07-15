import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralModificacionComponent } from './plural-modificacion.component';

const routes: Routes = [{ path: '', component: PluralModificacionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralModificacionRoutingModule {}
