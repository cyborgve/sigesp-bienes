import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorSeguroComponent } from '@pages/definiciones/seguros/buscador-seguro/buscador-seguro.component';
import { Seguro } from '@core/models/definiciones/seguro';

@Component({
  selector: 'app-filtro-seguro',
  templateUrl: './filtro-seguro.component.html',
  styleUrls: ['./filtro-seguro.component.scss'],
})
export class FiltroSeguroComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarSeguro() {
    let dialog = this._dialog.open(BuscadorSeguroComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((seguro: Seguro) =>
          this.formulario.patchValue({ seguro: seguro.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
