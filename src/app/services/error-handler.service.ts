import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage =
            'Erro 400: Requisição inválida. Verifique os dados e tente novamente.';
          break;
        case 404:
          errorMessage = 'Erro 404: Recurso não encontrado.';
          break;
        case 500:
          errorMessage = 'Erro 500: Erro interno do servidor.';
          break;
        default:
          errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }

    alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
