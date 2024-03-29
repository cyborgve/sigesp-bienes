import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorPaisComponent } from '@shared/components/buscador-pais/buscador-pais.component';
import { Pais } from '@core/models/otros-modulos/pais';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-pais',
  templateUrl: './filtro-pais.component.html',
  styleUrls: ['./filtro-pais.component.scss'],
})
export class FiltroPaisComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ pais: 'Todos' });
  }

  buscarPais() {
    let dialog = this._dialog.open(BuscadorPaisComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.pais),
        tap((pais: Pais) => this.formulario.patchValue({ pais: pais.id })),
        take(1)
      )
      .subscribe();
  }
}
