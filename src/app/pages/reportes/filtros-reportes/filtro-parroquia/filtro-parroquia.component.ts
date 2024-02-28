import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BuscadorParroquiaComponent } from '@shared/components/buscador-parroquia/buscador-parroquia.component';
import { Parroquia } from '@core/models/otros-modulos/parroquia';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-parroquia',
  templateUrl: './filtro-parroquia.component.html',
  styleUrls: ['./filtro-parroquia.component.scss'],
})
export class FiltroParroquiaComponent {
  @Input() formulario: UntypedFormGroup;
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
        puedeActualizarFormulario(this.formulario.value.parroquia),
        tap((parroquia: Parroquia) =>
          this.formulario.patchValue({ parroquia: parroquia.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
