import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activo-ubicacion',
  templateUrl: './activo-ubicacion.component.html',
  styleUrls: ['./activo-ubicacion.component.scss'],
})
export class ActivoUbicacionComponent {
  @Input() formulario: FormGroup = new FormGroup({});
}
