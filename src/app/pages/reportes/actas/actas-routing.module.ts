import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActasComponent } from './actas.component';

const routes: Routes = [{ path: '', component: ActasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActasRoutingModule {}
