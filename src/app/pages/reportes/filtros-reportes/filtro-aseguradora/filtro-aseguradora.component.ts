import { Component, Input } from '@angular/core';
import { tap, take, filter } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorAseguradoraComponent } from '@pages/definiciones/aseguradoras/buscador-aseguradora/buscador-aseguradora.component';
import { Aseguradora } from '@core/models/definiciones/aseguradora';

@Component({
  selector: 'app-filtro-aseguradora',
  templateUrl: './filtro-aseguradora.component.html',
  styleUrls: ['./filtro-aseguradora.component.scss'],
})
export class FiltroAseguradoraComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ aseguradora: 0 });
  }

  buscarAseguradora() {
    let dialog = this._dialog.open(BuscadorAseguradoraComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((aseguradora: Aseguradora) =>
          this.formulario.patchValue({ aseguradora: aseguradora.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
