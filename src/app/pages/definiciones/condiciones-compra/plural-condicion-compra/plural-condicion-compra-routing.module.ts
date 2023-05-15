import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PluralCondicionCompraComponent } from './plural-condicion-compra.component';

const routes: Routes = [
  { path: '', component: PluralCondicionCompraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluralCondicionCompraRoutingModule {}
