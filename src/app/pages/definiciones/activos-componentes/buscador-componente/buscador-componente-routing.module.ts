import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscadorComponenteComponent } from './buscador-componente.component';

const routes: Routes = [{ path: '', component: BuscadorComponenteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscadorComponenteRoutingModule {}
