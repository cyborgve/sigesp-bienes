import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activo-documentacion',
  templateUrl: './activo-documentacion.component.html',
  styleUrls: ['./activo-documentacion.component.scss'],
})
export class ActivoDocumentacionComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  buscarSedeUbicacion() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }
}
