import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activo-origen',
  templateUrl: './activo-origen.component.html',
  styleUrls: ['./activo-origen.component.scss'],
})
export class ActivoOrigenComponent {
  @Input() formulario: FormGroup = new FormGroup({});
}
