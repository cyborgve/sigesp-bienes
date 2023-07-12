import { Component, OnInit } from '@angular/core';
import { MENU } from '@core/constants/menu';

@Component({
  selector: 'app-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss'],
})
export class ProcesosComponent {
  titulo = 'Procesos';
  menuItems = MENU.find(
    m => m.label.toLowerCase() === this.titulo.toLowerCase()
  ).items;
}
