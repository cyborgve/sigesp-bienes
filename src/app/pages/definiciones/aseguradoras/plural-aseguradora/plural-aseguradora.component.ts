import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-aseguradora',
  templateUrl: './plural-aseguradora.component.html',
  styleUrls: ['./plural-aseguradora.component.scss'],
})
export class PluralAseguradoraComponent {
  titulo = 'aseguradoras';

  constructor(private _router: Router) {}

  nuevo = () =>
    this._router.navigate(['/definiciones/aseguradoras/aseguradora']);
}
