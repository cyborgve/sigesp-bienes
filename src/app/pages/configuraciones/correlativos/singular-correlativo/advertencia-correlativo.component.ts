import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-advertencia-correlativo',
  template: `
    <h2 mat-dialog-title class="advertencia-titulo">A D V E R T E N C I A</h2>
    <section mat-dialog-content>
      <p>
        Esta acción es sumamente peligrosa y afecta en el funcionamiento del
        sistema, podría causar daños catastróficos en la información.
      </p>
      <p>¿Seguro quiere continuar con la modificación del correlativo?</p>
    </section>
    <section mat-dialog-actions align="end">
      <button mat-stroked-button mat-dialog-close color="primary">
        Cancelar
      </button>
      <button mat-stroked-button color="primary" (click)="continuar()">
        Continuar
      </button>
    </section>
  `,
  styleUrls: ['./singular-correlativo.component.scss'],
})
export class AdvertenciaCorrelativoComponent {
  constructor(
    private _dialogRef: MatDialogRef<AdvertenciaCorrelativoComponent>
  ) {}

  continuar() {
    this._dialogRef.close(true);
  }
}
