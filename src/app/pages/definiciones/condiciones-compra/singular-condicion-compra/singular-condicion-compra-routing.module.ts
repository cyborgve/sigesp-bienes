import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingularCondicionCompraComponent } from './singular-condicion-compra.component';

const routes: Routes = [
  { path: '', component: SingularCondicionCompraComponent },
  { path: ':id', component: SingularCondicionCompraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingularCondicionCompraRoutingModule {}
