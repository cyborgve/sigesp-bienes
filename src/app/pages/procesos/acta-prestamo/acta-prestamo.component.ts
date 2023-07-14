import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-acta-prestamo',
  templateUrl: './acta-prestamo.component.html',
  styleUrls: ['./acta-prestamo.component.scss'],
})
export class ActaPrestamoComponent {
  titulo = 'Acta de Préstamo';
  formulario: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.formulario = this._formBuilder.group({
      comprobante: [0],
      creado: [new Date()],
    });
  }
}
