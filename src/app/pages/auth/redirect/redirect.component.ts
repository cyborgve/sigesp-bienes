import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';
import { SigespService, IConexion } from 'sigesp';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
  private data: IConexion;

  constructor(
    private route: ActivatedRoute,
    private sigesp: SigespService,
    private toastr: ToastrService,
    private router: Router,
    private _app: AppComponent
  ) {}

  ngOnInit() {
    if (this.route.snapshot.queryParamMap.get('data')) {
      this.data = JSON.parse(
        atob(this.route.snapshot.queryParamMap.get('data'))
      );

      this.sigesp.saveUser(this.data);
      this._app.usuario = this.sigesp.usuarioActivo;
      this.router.navigate(['home']);
    } else {
      this.toastr.error('No está autorizado para usar este módulo');
      this.router.navigate(['auth', 'not-logged']);
    }
  }
}
