import { take, tap, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Moneda } from '@core/models/otros-modulos/moneda';
import { BuscadorMonedaComponent } from '@shared/components/buscador-moneda/buscador-moneda.component';

@Component({
  selector: 'app-filtro-moneda',
  templateUrl: './filtro-moneda.component.html',
  styleUrls: ['./filtro-moneda.component.scss'],
})
export class FiltroMonedaComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarMoneda() {
    let dialog = this._dialog.open(BuscadorMonedaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((moneda: Moneda) =>
          this.formulario.patchValue({ moneda: moneda.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
