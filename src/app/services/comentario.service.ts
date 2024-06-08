import { pipe, tap } from 'rxjs';
import { PerfilService } from './perfil.service';
import { TokenService } from './../token/token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../models/Comentario';

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private readonly API = `http://localhost:8020`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  insere(comentario: string, idUsuario: string, idPublicacao: number) {
    return this.http.post(this.API + `/cadastrar`, {
      idUsuario,
      idPublicacao,
      comentario,
    });
  }

  listaComentarios(id:number) {
    return this.http
      .get<Comentario[]>(this.API + `/publicacao/${id}`)
      .pipe(tap((comentario) => console.log(comentario)));
  }
}
