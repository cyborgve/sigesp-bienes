import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorCiudadComponent } from '@shared/components/buscador-ciudad/buscador-ciudad.component';
import { Ciudad } from '@core/models/otros-modulos/ciudad';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-ciudad',
  templateUrl: './filtro-ciudad.component.html',
  styleUrls: ['./filtro-ciudad.component.scss'],
})
export class FiltroCiudadComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ ciudad: 'Todos' });
  }

  buscarCiudad() {
    let dialog = this._dialog.open(BuscadorCiudadComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.ciudad),
        tap((ciudad: Ciudad) =>
          this.formulario.patchValue({ ciudad: ciudad.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
