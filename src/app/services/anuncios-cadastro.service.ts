import { TokenService } from '../token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CadastroAnunciosService {
  private readonly API = `http://localhost:8090`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  insere(
    isbn: string,
    nomeLivro: string,
    autor: string,
    condicao: string,
    categoria: string,
    descricao: string,
    imagemFile: File
  ) {
    const formData = new FormData();
    formData.append('imagemFile', imagemFile);

    const body = {
      isbn: isbn,
      nomeLivro: nomeLivro,
      autor: autor,
      condicao: condicao,
      categoria: categoria,
      descricao: descricao,
    };

    const headers = new HttpHeaders({
      Authorization: `${this.tokenService.getToken()}`,
    });
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(this.API + '/livro/cadastrar', formData, {
      headers,
      params: body,
    });
  }
}
