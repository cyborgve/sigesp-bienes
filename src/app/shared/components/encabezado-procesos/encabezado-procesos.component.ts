import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-encabezado-procesos',
  templateUrl: './encabezado-procesos.component.html',
  styleUrls: ['./encabezado-procesos.component.scss'],
})
export class EncabezadoProcesosComponent {
  @Input() titulo: string = 'proceso';
  @Input() numeroComprobante: number = 1;
  @Input() creado: Date = new Date();
  @Input() modificado: Date = new Date();
}
