import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorMunicipioComponent } from '@shared/components/buscador-municipio/buscador-municipio.component';
import { Municipio } from '@core/models/otros-modulos/municipio';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-municipio',
  templateUrl: './filtro-municipio.component.html',
  styleUrls: ['./filtro-municipio.component.scss'],
})
export class FiltroMunicipioComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ municipio: 'Todos' });
  }

  buscarMunicipio() {
    let dialog = this._dialog.open(BuscadorMunicipioComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.municipio),
        tap((municipio: Municipio) =>
          this.formulario.patchValue({ municipio: municipio.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
