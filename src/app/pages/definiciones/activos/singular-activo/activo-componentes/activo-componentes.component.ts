import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activo-componentes',
  templateUrl: './activo-componentes.component.html',
  styleUrls: ['./activo-componentes.component.scss'],
})
export class ActivoComponentesComponent {
  @Input() formulario: FormGroup = new FormGroup({});
}
