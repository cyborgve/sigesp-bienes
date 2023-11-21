import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDepreciacionesAnualesComponent } from './lista-depreciaciones-anuales.component';

const routes: Routes = [
  { path: '', component: ListaDepreciacionesAnualesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaDepreciacionesAnualesRoutingModule {}
