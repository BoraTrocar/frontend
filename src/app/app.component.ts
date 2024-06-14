import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { PerfilService } from './services/perfil.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  emailUser = localStorage.getItem('emailUser');
  opened = false;

  constructor(
    public loginService: LoginService,
    public perfilService: PerfilService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  deslogar(): void {
    this.loginService.deslogar();
    localStorage.removeItem('emailUser');
    window.location.reload();
  }

  listaInfoPerfil(): void {
    this.perfilService.listaInfoPerfil();
  }

  criaUmAnuncio() {
    this.router.navigate(['anuncios/novo'], { relativeTo: this.route });
  }
}
