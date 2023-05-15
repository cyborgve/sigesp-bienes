import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-causa-movimiento',
  templateUrl: './plural-causa-movimiento.component.html',
  styleUrls: ['./plural-causa-movimiento.component.scss'],
})
export class PluralCausaMovimientoComponent {
  titulo = 'aseguradoras';

  constructor(private _router: Router) {}

  nuevo = () =>
    this._router.navigate(['/definiciones/causas-movimiento/causa-movimiento']);
}
