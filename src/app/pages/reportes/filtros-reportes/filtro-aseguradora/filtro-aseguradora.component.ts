import { Component, Input } from '@angular/core';
import { tap, take, filter } from 'rxjs/operators';
import { UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BuscadorAseguradoraComponent } from '@pages/definiciones/aseguradoras/buscador-aseguradora/buscador-aseguradora.component';
import { Aseguradora } from '@core/models/definiciones/aseguradora';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-aseguradora',
  templateUrl: './filtro-aseguradora.component.html',
  styleUrls: ['./filtro-aseguradora.component.scss'],
})
export class FiltroAseguradoraComponent {
  @Input() formulario: UntypedFormGroup;
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
        puedeActualizarFormulario(this.formulario.value.aseguradora),
        tap((aseguradora: Aseguradora) =>
          this.formulario.patchValue({ aseguradora: aseguradora.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
