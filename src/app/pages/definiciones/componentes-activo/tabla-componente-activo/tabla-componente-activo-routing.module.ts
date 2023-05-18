import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponenteActivoComponent } from './tabla-componente-activo.component';

const routes: Routes = [
  { path: '', component: TablaComponenteActivoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaComponenteActivoRoutingModule {}
