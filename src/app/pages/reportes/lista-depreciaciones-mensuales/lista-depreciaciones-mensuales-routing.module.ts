import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDepreciacionesMensualesComponent } from './lista-depreciaciones-mensuales.component';

const routes: Routes = [
  { path: '', component: ListaDepreciacionesMensualesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDepreciacionesMensualesRoutingModule {}
