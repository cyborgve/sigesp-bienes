import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RedirectComponent } from './redirect/redirect.component';
import { NotLoggedComponent } from './not-logged/not-logged.component';
import { SessionGuard } from 'src/app/shared/guards/session.guard';
import { CloseComponent } from './close/close.component';


const routes: Routes = [
  { path: 'redirect', component: RedirectComponent },
  { path: 'unauthenticated', component: NotLoggedComponent, canActivate: [SessionGuard] },
  { path: 'close', component: CloseComponent },
  { path: '', redirectTo: 'redirect', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
