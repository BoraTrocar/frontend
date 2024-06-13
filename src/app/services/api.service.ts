import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly URL = environment.apiUrl;

  getBaseUrl(): string {
    return this.URL;
  }
}
