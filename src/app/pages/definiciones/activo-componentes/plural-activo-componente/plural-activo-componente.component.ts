import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-activo-componente',
  templateUrl: './plural-activo-componente.component.html',
  styleUrls: ['./plural-activo-componente.component.scss'],
})
export class PluralActivoComponenteComponent {
  titulo = 'activo componentes';

  constructor(private _router: Router) {}

  nuevo = () =>
    this._router.navigate([
      '/definiciones/activo-componentes/activo-componente',
    ]);
}
