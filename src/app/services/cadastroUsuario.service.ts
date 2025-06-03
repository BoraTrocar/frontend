import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cep } from '../models/Cep';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CadastroUsuarioService {
  private readonly viaCEP = `https://viacep.com.br/ws`;

  constructor(private http: HttpClient, private apiService: ApiService) {}

  insereNoBanco(
    imagemPerfil: string,
    nomeUsuario: string,
    email: string,
    nickname: string,
    senha: string,
    dataNascimento: string,
    latitude: string,
    longitude: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    const url = this.apiService.getBaseUrl() + `usuario/cadastrar`;
    const payload = {
      imagemPerfil,
      nomeUsuario,
      email,
      nickname,
      senha,
      dataNascimento,
      latitude,
      longitude,
    };

    return this.http
      .post(url, payload, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      'Erro na comunicação com o servidor. Por favor, tente novamente.'
    );
  }
  verificaCEP(cep: string): Observable<Cep> {
    return this.http.get<Cep>(this.viaCEP + `/${cep}/json`).pipe();
  }
}
