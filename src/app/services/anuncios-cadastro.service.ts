// cadastro-anuncios.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CadastroAnunciosService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private apiService: ApiService
  ) {}

  insere(anuncioData: {
    isbn: string;
    nomeLivro: string;
    autor: string;
    condicao: string;
    categoria: string;
    descricao: string;
    imagem: string;
  }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.tokenService.getToken()}`,
    });

    return this.http.post(
      this.apiService.getBaseUrl() + 'livro/cadastrar',
      anuncioData,
      { headers }
    );
  }
}
