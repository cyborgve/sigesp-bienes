import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { BuscadorProveedorComponent } from '@shared/components/buscador-proveedor/buscador-proveedor.component';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-proveedor',
  templateUrl: './filtro-proveedor.component.html',
  styleUrls: ['./filtro-proveedor.component.scss'],
})
export class FiltroProveedorComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ proveedor: 'Todos' });
  }

  buscarProveedor() {
    let dialog = this._dialog.open(BuscadorProveedorComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.proveedor),
        tap((proveedor: Proveedor) =>
          this.formulario.patchValue({ proveedor: proveedor.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
