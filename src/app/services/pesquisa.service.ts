import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PesquisaService {
  private readonly API = `http://localhost:8090`;
  constructor(private http: HttpClient) {}

  realizaPesquisa(inputUsuario: string) {
    return this.http.post(this.API + `/livro/pesquisar/${inputUsuario}`, null);
  }
}
