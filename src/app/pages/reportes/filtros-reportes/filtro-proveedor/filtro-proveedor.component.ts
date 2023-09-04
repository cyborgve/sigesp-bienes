import { tap, take } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { BuscadorProveedorComponent } from '@shared/components/buscador-proveedor/buscador-proveedor.component';

@Component({
  selector: 'app-filtro-proveedor',
  templateUrl: './filtro-proveedor.component.html',
  styleUrls: ['./filtro-proveedor.component.scss'],
})
export class FiltroProveedorComponent {
  @Input() proveedor = new FormControl(['---']);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarProveedor() {
    let dialog = this._dialog.open(BuscadorProveedorComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        tap((proveedor: Proveedor) =>
          proveedor ? this.proveedor.patchValue(proveedor.id) : undefined
        ),
        take(1)
      )
      .subscribe();
  }
}
