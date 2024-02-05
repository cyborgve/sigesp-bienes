import { Component } from '@angular/core';
import { MENU } from '@core/constants/menu';
import { SigespService } from 'sigesp';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss'],
})
export class ConfiguracionesComponent {
  titulo = 'Configuraciones';
  menuItems = () => {
    let items = MENU.find(
      m => m.label.toLowerCase() === this.titulo.toLowerCase()
    ).items.sort((a, b) => (a.label < b.label ? -1 : 1));
    return true
      ? items
      : items.filter(item => item.routerLink !== 'incorporaciones-migradas');
  };
  constructor(private _sigesp: SigespService) {}
}
