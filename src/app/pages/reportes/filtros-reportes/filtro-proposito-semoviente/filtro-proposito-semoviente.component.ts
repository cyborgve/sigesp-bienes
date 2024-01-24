import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PropositoSemoviente } from '@core/models/definiciones/proposito-semoviente';
import { BuscadorPropositoSemovienteComponent } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.component';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-proposito-semoviente',
  templateUrl: './filtro-proposito-semoviente.component.html',
  styleUrls: ['./filtro-proposito-semoviente.component.scss'],
})
export class FiltroPropositoSemovienteComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ propositoSemoviente: 0 });
  }

  buscarPropositoSemoviente() {
    let dialog = this._dialog.open(BuscadorPropositoSemovienteComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.propositoSemoviente),
        tap((propositoSemoviente: PropositoSemoviente) =>
          this.formulario.patchValue({
            propositoSemoviente: propositoSemoviente.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
