import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuenteFinanciamiento } from '@core/models/otros-modulos/fuente-financiamiento';
import { BuscadorFuenteFinanciamientoComponent } from '@shared/components/buscador-fuente-financiamiento/buscador-fuente-financiamiento.component';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-fuente-financiamiento',
  templateUrl: './filtro-fuente-financiamiento.component.html',
  styleUrls: ['./filtro-fuente-financiamiento.component.scss'],
})
export class FiltroFuenteFinanciamientoComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ fuenteFinanciamiento: 'Todos' });
  }

  buscarFuenteFinanciamiento() {
    let dialog = this._dialog.open(BuscadorFuenteFinanciamientoComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.fuenteFinanciamiento),
        tap((fuenteFinanciamiento: FuenteFinanciamiento) =>
          this.formulario.patchValue({
            fuenteFinanciamiento: fuenteFinanciamiento.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
