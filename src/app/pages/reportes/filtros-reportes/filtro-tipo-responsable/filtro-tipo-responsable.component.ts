import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtro-tipo-responsable',
  templateUrl: './filtro-tipo-responsable.component.html',
  styleUrls: ['./filtro-tipo-responsable.component.scss'],
})
export class FiltroTipoResponsableComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;
  tiposResponsable = ['Ambos', 'Responsable Principal', 'Responsable de Uso'];

  reiniciar() {
    this.formulario.patchValue({ tipoResponsable: 0 });
  }
}
