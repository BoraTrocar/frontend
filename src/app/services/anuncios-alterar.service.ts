import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class AnunciosAlterarService {
  constructor(
    private tokenService: TokenService,
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  altera(
    idLivro: number,
    isbn: string,
    nomeLivro: string,
    autor: string,
    condicao: string,
    categoria: string,
    descricao: string
  ) {
    const headers = new HttpHeaders({
      Authorization: `${this.tokenService.getToken()}`,
    });

    return this.http.put(
    this.apiService.getBaseUrl() + `livro/alterar/${idLivro}`,
      {
        isbn,
        nomeLivro,
        autor,
        condicao,
        categoria,
        descricao,
      },
      { headers }
    );
  }
}
