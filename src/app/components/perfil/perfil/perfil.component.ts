import { Component } from '@angular/core';
import { Perfil } from '../../../models/Perfil';
import { Observable } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { PerfilService } from '../../../services/perfil.service';
import { Router } from '@angular/router';
import { AnunciosService } from '../../../services/anuncios.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent {
  perfil$: Observable<Perfil>;

  constructor(
    private perfilService: PerfilService,
    public loginService: LoginService,
    private router: Router,
    private anunciosService: AnunciosService,
    private meta: Meta
  ) {
    this.perfil$ = this.perfilService.listaInfoPerfil();
    this.meta.addTag({ name: 'description', content: 'Sua descrição aqui' });
  }

  deletaAnuncio(idLivro: number) {
    this.perfilService.apagaAnuncio(idLivro);
  }

  alteraAnuncio(idLivro: number) {
    this.router.navigate(['livro/alterar/', idLivro]);
    /* const anuncio$ = this.anunciosService.pegarAnuncio(idLivro);
    anuncio$.subscribe((anuncio) => {
      //console.log(anuncio);
    }); */
  }

  ngOnInit(): void {}
}
