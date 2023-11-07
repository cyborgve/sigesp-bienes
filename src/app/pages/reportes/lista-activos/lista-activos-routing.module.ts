import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaActivosComponent } from './lista-activos.component';

const routes: Routes = [{ path: '', component: ListaActivosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaActivosRoutingModule {}
