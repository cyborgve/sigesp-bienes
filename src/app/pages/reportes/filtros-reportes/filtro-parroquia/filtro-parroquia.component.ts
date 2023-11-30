import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorParroquiaComponent } from '@shared/components/buscador-parroquia/buscador-parroquia.component';
import { Parroquia } from '@core/models/otros-modulos/parroquia';

@Component({
  selector: 'app-filtro-parroquia',
  templateUrl: './filtro-parroquia.component.html',
  styleUrls: ['./filtro-parroquia.component.scss'],
})
export class FiltroParroquiaComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ parroquia: 'Todos' });
  }

  buscarParroquia() {
    let dialog = this._dialog.open(BuscadorParroquiaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((parroquia: Parroquia) =>
          this.formulario.patchValue({ parroquia: parroquia.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
