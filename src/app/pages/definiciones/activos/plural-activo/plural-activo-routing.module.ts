import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralActivoComponent } from './plural-activo.component';

const routes: Routes = [{ path: '', component: PluralActivoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralActivoRoutingModule {}
