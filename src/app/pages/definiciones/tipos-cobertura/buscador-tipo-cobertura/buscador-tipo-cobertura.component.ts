import { Component, Inject } from '@angular/core';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';

@Component({
  selector: 'app-buscador-tipo-cobertura',
  templateUrl: './buscador-tipo-cobertura.component.html',
  styleUrls: ['./buscador-tipo-cobertura.component.scss'],
})
export class BuscadorTipoCoberturaComponent {
  titulo = 'buscador de tipos de cobertura';
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.TIPOS_COBERTURA.filter(
    c => c !== 'acciones'
  );
  filtros: any[] = [];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorTipoCoberturaComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { filtros: any[] }
  ) {
    if (this.data && this.data.filtros) this.filtros = this.data.filtros;
  }

  seleccionar = (entidad: TipoCobertura) => {
    this._dialogRef.close(entidad);
  };
}
