import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-encabezado-definicion',
  templateUrl: './encabezado-definicion.component.html',
  styleUrls: ['./encabezado-definicion.component.scss'],
})
export class EncabezadoDefinicionComponent {
  @Input() titulo: string = '';
  @Input() creado: Date = undefined;
  @Input() modificado: Date = undefined;
}
