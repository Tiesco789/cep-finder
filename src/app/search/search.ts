import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';
import { CepResponse } from '../models/cep.model';
import { WeatherDisplay } from '../models/weather.model';

// Re-export for backward compatibility
export type cepObj = CepResponse;

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  cep?: CepResponse;
  clima?: WeatherDisplay;
  cepDigitado: string = '';

  carregandoCep = false;
  carregandoClima = false;
  erroCep?: string;
  erroClima?: string;

  constructor(private api: Api) { }

  loadCep() {
    const cepLimpo = this.cepDigitado.replace(/\D/g, '');
    if (!cepLimpo) return;

    // Reset state
    this.cep = undefined;
    this.clima = undefined;
    this.erroCep = undefined;
    this.erroClima = undefined;
    this.carregandoCep = true;
    this.carregandoClima = false;

    this.api.getCep(cepLimpo).subscribe({
      next: (cepData) => {
        this.cep = cepData;
        this.carregandoCep = false;

        // Busca clima automaticamente após obter o CEP
        if (cepData.localidade && cepData.uf) {
          this.loadClima(cepData.localidade, cepData.uf);
        }
      },
      error: (err: Error) => {
        this.erroCep = err.message;
        this.carregandoCep = false;
      }
    });
  }

  private loadClima(cidade: string, uf: string) {
    this.carregandoClima = true;
    this.erroClima = undefined;

    this.api.getClima(cidade, uf).subscribe({
      next: (climaData) => {
        this.clima = climaData;
        this.carregandoClima = false;
      },
      error: (err: Error) => {
        this.erroClima = err.message;
        this.carregandoClima = false;
      }
    });
  }

  /**
   * Formata hora a partir de um objeto Date.
   */
  formatarHora(date: Date): string {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  /**
   * Retorna a direção cardinal a partir de graus do vento.
   */
  getDirecaoVento(graus: number): string {
    const direcoes = ['N', 'NE', 'L', 'SE', 'S', 'SO', 'O', 'NO'];
    const index = Math.round(graus / 45) % 8;
    return direcoes[index];
  }
}
