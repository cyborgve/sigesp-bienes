import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoSemoviente } from '@core/models/definiciones/tipo-semoviente';

@Component({
  selector: 'app-buscador-tipo-semoviente',
  templateUrl: './buscador-tipo-semoviente.component.html',
  styleUrls: ['./buscador-tipo-semoviente.component.scss'],
})
export class BuscadorTipoSemovienteComponent {
  titulo = 'buscador de tipos de semoviente';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_SEMOVIENTE.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoSemovienteComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: TipoSemoviente) => {
    this._dialogRef.close(entidad);
  };
}
