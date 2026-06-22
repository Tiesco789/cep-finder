/** Resposta tipada da API OpenWeatherMap */
export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

/** Modelo processado para exibição no componente */
export interface WeatherDisplay {
  temperatura: number;
  sensacaoTermica: number;
  tempMin: number;
  tempMax: number;
  descricao: string;
  icone: string;
  umidade: number;
  ventoVelocidade: number;
  ventoRajada?: number;
  pressao: number;
  nuvens: number;
  cidade: string;
  coordenadas: {
    lat: number;
    lon: number;
  };
  nascerDoSol: Date;
  porDoSol: Date;
}
