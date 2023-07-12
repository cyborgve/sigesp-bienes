import { Component, ElementRef, ViewChild } from '@angular/core';
import { MENU } from '@core/constants/menu';
import { MenuItem } from '@core/models/auxiliares/menu-item';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-definiciones',
  templateUrl: './definiciones.component.html',
  styleUrls: ['./definiciones.component.scss'],
})
export class DefinicionesComponent {
  @ViewChild('buscar') buscarElement: ElementRef<HTMLInputElement>;
  titulo = 'Definiciones';
  private menuItems: MenuItem[] = [];
  private definiciones$ = new BehaviorSubject<MenuItem[]>([]);
  definiciones = () => this.definiciones$.asObservable();

  constructor() {
    this.menuItems = MENU.find(
      item => item.label.toLowerCase() === this.titulo.toLowerCase()
    ).items.sort((a, b) => (a.label > b.label ? 1 : -1));
    this.definiciones$.next(this.menuItems);
  }

  filtrarDatos(event: Event) {
    let entrada = event.target as HTMLInputElement;
    let palabra = entrada.value.trim().toLowerCase();
    this.definiciones$.next(
      this.menuItems.filter(mi => mi.label.toLowerCase().includes(palabra))
    );
  }

  limpiarBuscador() {
    this.buscarElement.nativeElement.value = '';
    this.definiciones$.next(this.menuItems);
  }
}
