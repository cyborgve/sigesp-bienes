import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { CurrencyInputComponent } from './components/currency-input/currency-input.component';
import { IsoCurrencyPipe } from './pipes/iso-currency.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ToolbarComponent, 
    LoadingScreenComponent,
    CurrencyInputComponent,
    IsoCurrencyPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    MaterialModule,
    ToolbarComponent,
    LoadingScreenComponent,
    CurrencyInputComponent,
    IsoCurrencyPipe
  ]
})
export class SharedModule { }
