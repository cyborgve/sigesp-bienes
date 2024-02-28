import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LineEnterprise } from '@core/models/otros-modulos/line-enterprise';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';
import { BuscadorLineEnterpriseComponent } from '@shared/components/buscador-line-enterprise/buscador-line-enterprise.component';
import { filter, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-line-enterprise',
  templateUrl: './filtro-line-enterprise.component.html',
  styleUrls: ['./filtro-line-enterprise.component.scss'],
})
export class FiltroLineEnterpriseComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ lineEnterprise: 'Seleccionar' });
  }

  buscarLineEnterprise() {
    let dialog = this._dialog.open(BuscadorLineEnterpriseComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.lineEnterprise),
        tap((lineEnterprise: LineEnterprise) =>
          this.formulario.patchValue({
            lineEnterprise: lineEnterprise.id,
          })
        ),
        take(1)
      )
      .subscribe();
  }
}
