import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { Perfil } from '../models/Perfil';
import { pipe, tap } from 'rxjs';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private apiService: ApiService
  ) {}

  listaInfoPerfil() {
    const headers = new HttpHeaders({
      Authorization: `${this.tokenService.getToken()}`,
    });

    return this.http
      .get<Perfil>(this.apiService.getBaseUrl() + `usuario/perfil`, { headers })
      .pipe(tap((perfil) => console.log(perfil)));
  }

  apagaAnuncio(idLivro: number) {
    const headers = new HttpHeaders({
      Authorization: `${this.tokenService.getToken()}`,
    });

    return this.http
      .delete(this.apiService.getBaseUrl() + `livro/deletar/${idLivro}`, { headers })
      .pipe(
        tap(() => {
          window.location.reload();
        })
      )
      .subscribe();
  }

  alteraAnuncio(idLivro: number) {
    const headers = new HttpHeaders({
      Authorization: `${this.tokenService.getToken()}`,
    });

    return this.http
      .put(this.apiService.getBaseUrl() + `livro/alterar/${idLivro}`, { headers })
      .pipe(
        tap(() => {
          window.location.reload();
        })
      )
      .subscribe();
  }
}
