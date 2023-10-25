import { Component } from '@angular/core';
import { MENU } from '@core/constants/menu';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss'],
})
export class ConfiguracionesComponent {
  titulo = 'Configuraciones';
  menuItems = MENU.find(
    m => m.label.toLowerCase() === this.titulo.toLowerCase()
  ).items.sort((a, b) => (a.label < b.label ? -1 : 1));
}
