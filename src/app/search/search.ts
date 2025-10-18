import { Component } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';

export interface cepObj {
    cep: string,
    logradouro: string,
    complemento: string,
    unidade: string,
    bairro: string,
    localidade: string,
    uf: string,
    estado: string,
    regiao: string,
    ibge: string,
    gia: number,
    ddd: number,
    siafi: number
}

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  cep?: cepObj;
  cepDigitado: string = '';
  temperatura?: number;
  descricaoClima?: string;

  constructor (private apiCep: Api, private apiTemp: Api) {  }

  loadCep() {
    if (!this.cepDigitado) return;

    this.apiCep.getCep(this.cepDigitado).subscribe({
      next: (cepData) => {
        this.cep = cepData

        if (cepData.localidade && cepData.uf) {
          this.apiCep.getTemperatura(cepData.localidade, cepData.uf).subscribe({
            next: (tempData: any) => {
              this.temperatura = tempData.main.temp;
              this.descricaoClima = tempData.weather[0].description;
            },
            error: (err) => console.error("Erro ao buscar a temperatura", err)
          })
        }
      },
      error: (err) => console.error('Erro ao buscar CEP:', err),
    });
  }
}
