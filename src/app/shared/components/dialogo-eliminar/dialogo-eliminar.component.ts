import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-eliminar',
  templateUrl: './dialogo-eliminar.component.html',
  styleUrls: ['./dialogo-eliminar.component.scss'],
})
export class DialogoEliminarComponent {
  constructor(
    private _dialogRef: MatDialogRef<DialogoEliminarComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { codigo: string; denominacion: string }
  ) {}

  okOpcion = () => this._dialogRef.close(true);
  noOpcion = () => this._dialogRef.close(false);
}
