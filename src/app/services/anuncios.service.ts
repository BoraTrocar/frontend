import { Injectable } from '@angular/core';
import { Anuncio } from '../models/Anuncio';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class AnunciosService {
  id!: number;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private apiService: ApiService
  ) {}

  listaTudo() {
    return this.httpClient.get<Anuncio[]>(this.apiService.getBaseUrl() + 'livro/all');
    //.pipe(tap((postagens) => console.log(postagens)));
  }

  pegarAnuncio(id: number) {
    // const headers = new HttpHeaders({  Authorization: `${this.tokenService.getToken()}`,});

    return this.httpClient.get<Anuncio>(
      this.apiService.getBaseUrl() + `livro/buscar_livro/${id}`
      //{headers,}
    );
    //.subscribe();
  }
}
