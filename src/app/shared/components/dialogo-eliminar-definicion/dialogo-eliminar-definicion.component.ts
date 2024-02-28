import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-eliminar-definicion',
  templateUrl: './dialogo-eliminar-definicion.component.html',
  styleUrls: ['./dialogo-eliminar-definicion.component.scss'],
})
export class DialogoEliminarDefinicionComponent {
  constructor(
    private _dialogRef: MatDialogRef<DialogoEliminarDefinicionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { codigo: string; denominacion: string }
  ) {}

  okOpcion = () => this._dialogRef.close(true);
  noOpcion = () => this._dialogRef.close(false);
}
