import { Component } from '@angular/core';
import { MENU } from '@core/constants/menu';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesComponent {
  titulo = 'reportes';
  menuItems = MENU.find(
    m => m.label.toLowerCase() === this.titulo.toLowerCase()
  ).items;
}
