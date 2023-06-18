import { Component, OnInit } from '@angular/core';
import { MENU } from '@core/constants/menu';
import { MenuItem } from '@core/models/menu-item';

@Component({
  selector: 'app-definiciones',
  templateUrl: './definiciones.component.html',
  styleUrls: ['./definiciones.component.scss'],
})
export class DefinicionesComponent {
  title = 'Definiciones';
  items: MenuItem[] = MENU.find(i => i.label === this.title).items.sort();

  buscar(event: Event) {
    alert('TODO');
  }
}
