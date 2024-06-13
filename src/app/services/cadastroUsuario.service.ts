import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Cep } from '../models/Cep';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root',
})
export class CadastroUsuarioService {
  private readonly viaCEP = `https://viacep.com.br/ws`;

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {}

  insereNoBanco(
    nomeUsuario: string,
    email: string,
    nickname: string,
    senha: string,
    dataNascimento: string,
    cep: string,
    cidade: string,
    uf: string
  ) {
    return this.http.post(this.apiService.getBaseUrl() + `usuario/cadastrar`, {
      nomeUsuario,
      email,
      nickname,
      senha,
      dataNascimento,
      cep,
      cidade,
      uf,
    });
  }

  verificaCEP(cep: string): Observable<Cep> {
    console.log('teste');
    return this.http.get<Cep>(this.viaCEP + `/${cep}/json`).pipe(
      tap((cepResponse: Cep) => {
        console.log(cepResponse);
      })
    );
  }
}
