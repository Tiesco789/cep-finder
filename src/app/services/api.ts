import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CepResponse } from '../models/cep.model';
import { WeatherDisplay, WeatherResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private readonly apiKeyOpenWeather = '16c48e8a579afa50283ae5e3d2b5e6d1';
  private readonly cepBaseUrl = 'https://viacep.com.br/ws';
  private readonly weatherBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) { }

  /**
   * Busca informações de endereço a partir de um CEP.
   * Valida o formato do CEP e trata erros de rede.
   */
  getCep(cep: string): Observable<CepResponse> {
    const cleanCep = cep.replace(/\D/g, '');

    if (cleanCep.length !== 8) {
      return throwError(() => new Error('CEP deve conter exatamente 8 dígitos.'));
    }

    return this.http.get<CepResponse>(`${this.cepBaseUrl}/${cleanCep}/json/`).pipe(
      map(response => {
        if (response.erro) {
          throw new Error('CEP não encontrado.');
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Consulta a previsão do tempo via OpenWeatherMap.
   * Retorna um WeatherDisplay processado para uso direto na UI.
   */
  getClima(cidade: string, uf: string): Observable<WeatherDisplay> {
    const params = new URLSearchParams({
      q: `${cidade},${uf},BR`,
      appid: this.apiKeyOpenWeather,
      units: 'metric',
      lang: 'pt_br'
    });

    return this.http.get<WeatherResponse>(`${this.weatherBaseUrl}?${params.toString()}`).pipe(
      map(response => this.mapWeatherResponse(response)),
      catchError(this.handleError)
    );
  }

  /**
   * Transforma a resposta bruta da API em um modelo limpo para exibição.
   */
  private mapWeatherResponse(data: WeatherResponse): WeatherDisplay {
    const weather = data.weather[0];
    return {
      temperatura: Math.round(data.main.temp),
      sensacaoTermica: Math.round(data.main.feels_like),
      tempMin: Math.round(data.main.temp_min),
      tempMax: Math.round(data.main.temp_max),
      descricao: weather.description,
      icone: `https://openweathermap.org/img/wn/${weather.icon}@2x.png`,
      umidade: data.main.humidity,
      ventoVelocidade: Math.round(data.wind.speed * 3.6), // m/s → km/h
      ventoRajada: data.wind.gust ? Math.round(data.wind.gust * 3.6) : undefined,
      pressao: data.main.pressure,
      nuvens: data.clouds.all,
      cidade: data.name,
      coordenadas: {
        lat: data.coord.lat,
        lon: data.coord.lon
      },
      nascerDoSol: new Date(data.sys.sunrise * 1000),
      porDoSol: new Date(data.sys.sunset * 1000)
    };
  }

  /**
   * Tratamento centralizado de erros HTTP.
   */
  private handleError(error: HttpErrorResponse | Error): Observable<never> {
    let mensagem: string;

    if (error instanceof Error) {
      mensagem = error.message;
    } else if (error.status === 0) {
      mensagem = 'Erro de conexão. Verifique sua internet.';
    } else if (error.status === 404) {
      mensagem = 'Localidade não encontrada.';
    } else if (error.status === 401) {
      mensagem = 'Erro de autenticação com o serviço de clima.';
    } else {
      mensagem = `Erro inesperado: ${error.status} - ${error.statusText}`;
    }

    return throwError(() => new Error(mensagem));
  }
}
