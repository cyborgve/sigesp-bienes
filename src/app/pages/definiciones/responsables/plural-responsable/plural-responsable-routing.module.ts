import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralResponsableComponent } from './plural-responsable.component';

const routes: Routes = [{ path: '', component: PluralResponsableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralResponsableRoutingModule {}
