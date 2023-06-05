import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-activo-datos-generales',
  templateUrl: './activo-datos-generales.component.html',
  styleUrls: ['./activo-datos-generales.component.scss'],
})
export class ActivoDatosGeneralesComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  constructor(private _dialog: MatDialog) {}
}
