import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-encabezado-reportes',
  templateUrl: './encabezado-reportes.component.html',
  styleUrls: ['./encabezado-reportes.component.scss'],
})
export class EncabezadoReportesComponent {
  @Input() titulo: string = 'Titulo del Reporte';
  @Input() fechaEmision: string = 'Fecha de emision';
}
