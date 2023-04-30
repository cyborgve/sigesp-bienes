import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RedirectComponent } from './redirect/redirect.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotLoggedComponent } from './not-logged/not-logged.component';
import { CloseComponent } from './close/close.component';


@NgModule({
  declarations: [RedirectComponent, NotLoggedComponent, CloseComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
