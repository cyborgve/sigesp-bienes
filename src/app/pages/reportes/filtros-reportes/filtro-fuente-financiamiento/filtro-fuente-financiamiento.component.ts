import { tap, take } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuenteFinanciamiento } from '@core/models/otros-modulos/fuente-financiamiento';
import { BuscadorFuenteFinanciamientoComponent } from '@shared/components/buscador-fuente-financiamiento/buscador-fuente-financiamiento.component';

@Component({
  selector: 'app-filtro-fuente-financiamiento',
  templateUrl: './filtro-fuente-financiamiento.component.html',
  styleUrls: ['./filtro-fuente-financiamiento.component.scss'],
})
export class FiltroFuenteFinanciamientoComponent {
  @Input() fuenteFinanciamiento = new FormControl(['---']);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarFuenteFinanciamiento() {
    let dialog = this._dialog.open(BuscadorFuenteFinanciamientoComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((fuenteFinanciamiento: FuenteFinanciamiento) =>
          fuenteFinanciamiento
            ? this.fuenteFinanciamiento.patchValue(fuenteFinanciamiento.id)
            : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
