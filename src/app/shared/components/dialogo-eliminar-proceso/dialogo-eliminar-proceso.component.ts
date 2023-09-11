import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoProceso } from '@core/types/tipo-proceso';

@Component({
  selector: 'app-dialogo-eliminar-proceso',
  templateUrl: './dialogo-eliminar-proceso.component.html',
  styleUrls: ['./dialogo-eliminar-proceso.component.scss'],
})
export class DialogoEliminarProcesoComponent {
  constructor(
    private _dialogRef: MatDialogRef<DialogoEliminarProcesoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { comprobante: string; tipoProceso: TipoProceso }
  ) {}

  okOpcion = () => this._dialogRef.close(true);
  noOpcion = () => this._dialogRef.close(false);
}
