import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './../token/token.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private ApiService: ApiService
  ) {}

  insere(comentario: string, idPublicacao: number) {
    return this.http.post(
      this.ApiService.getBaseUrl + `comentarios/cadastrar`,
      {
        idPublicacao,
        comentario,
      }
    );
  }

  async obterComentarios(idPublicacao: string) {
    try {
      const response = await this.http
        .get(this.ApiService.getBaseUrl + `/comentarios/${idPublicacao}`)
        .toPromise();
      return response;
    } catch (error) {
      console.error('Erro ao carregar comentários:', error);
      throw error;
    }
  }
}
