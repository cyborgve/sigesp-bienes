import { map, tap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuscadorOrigenComponent } from '@pages/definiciones/origenes/buscador-origen/buscador-origen.component';
import { Basica } from '@core/models/basica';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-activo-origen',
  templateUrl: './activo-origen.component.html',
  styleUrls: ['./activo-origen.component.scss'],
})
export class ActivoOrigenComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  constructor(private _dialog: MatDialog) {}
}
