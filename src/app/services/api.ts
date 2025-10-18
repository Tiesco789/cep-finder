import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cepObj } from '../search/search';

@Injectable({
  providedIn: 'root'
})
export class Api {
  apiKeyOpenWeather = 'SUA_CHAVE_AQUI';

  private cepBaseUrl = `https://viacep.com.br/ws/`;
  private tempBaseUrl = `https://api.openweathermap.org/data/2.5/weather`

  constructor (private http: HttpClient) {  }

  getCep(cep: string): Observable<cepObj> {
    return this.http.get<cepObj>(`${this.cepBaseUrl}/${cep}/json/`)
  }

  getTemperatura(cidade: string, uf: string): Observable<any> {
    return this.http.get<any>(
      `${this.tempBaseUrl}?q=${cidade},${uf},BR&appid=${this.apiKeyOpenWeather}&units=metric&lang=pt_br`
    );
  }
}
