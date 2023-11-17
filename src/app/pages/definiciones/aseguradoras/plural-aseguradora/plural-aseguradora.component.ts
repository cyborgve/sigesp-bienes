import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-aseguradora',
  templateUrl: './plural-aseguradora.component.html',
  styleUrls: ['./plural-aseguradora.component.scss'],
})
export class PluralAseguradoraComponent {
  titulo = 'aseguradoras';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/definiciones']);
}
