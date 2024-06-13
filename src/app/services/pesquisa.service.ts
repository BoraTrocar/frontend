import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class PesquisaService {
  constructor(
      private http: HttpClient,
      private apiService: ApiService
  ) {}

  realizaPesquisa(inputUsuario: string) {
    return this.http.post(this.apiService.getBaseUrl() + `livro/pesquisar/${inputUsuario}`, null);
  }
}
