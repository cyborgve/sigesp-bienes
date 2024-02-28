import { Component } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';

@Component({
  selector: 'app-buscador-acta-prestamo',
  templateUrl: './buscador-acta-prestamo.component.html',
  styleUrls: ['./buscador-acta-prestamo.component.scss'],
})
export class BuscadorActaPrestamoComponent {
  titulo = 'buscador de actas de préstamo';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.ACTAS_PRESTAMO.filter(
    c => c !== 'acciones-proceso'
  );
  constructor(
    private _dialogRef: MatDialogRef<BuscadorActaPrestamoComponent>
  ) {}

  seleccionar = (entidad: ActaPrestamo) => {
    this._dialogRef.close(entidad);
  };
}
