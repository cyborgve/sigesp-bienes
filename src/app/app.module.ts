import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppModule as SigespModule } from 'sigesp';
import { HeaderHttpInterceptor } from '@core/interceptors/header-http.interceptor';
import { registerLocaleData } from '@angular/common';
import esVE from '@angular/common/locales/es-VE';
import { MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';
import { PaginadorPersonalizadoIntl } from './material/paginador-personalizado-intl';

registerLocaleData(esVE, 'es-VE');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SigespModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-VE' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderHttpInterceptor,
      multi: true,
    },
    { provide: MatPaginatorIntl, useClass: PaginadorPersonalizadoIntl },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
