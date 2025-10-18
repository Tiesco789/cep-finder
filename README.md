# CepFinder

Esse projeto foi criado usando [Angular CLI](https://github.com/angular/angular-cli) versão 20.3.4.

## Aplicação de Busca por CEP

Este projeto é uma aplicação web desenvolvida em **Angular**, que permite buscar informações de um CEP no Brasil e consultar a **temperatura e clima da cidade** utilizando a API **OpenWeather**. O design é moderno e responsivo, com suporte a **dark mode**, utilizando **TailwindCSS**.

---

## Tecnologias Utilizadas

- Angular 18
- TypeScript
- TailwindCSS
- RxJS
- API ViaCEP (https://viacep.com.br)
- API OpenWeather (https://openweathermap.org)
- HTML5 & CSS3

---

## Funcionalidades

1. Buscar CEP e exibir informações:
   - Logradouro
   - Bairro
   - Cidade
   - UF
   - DDD
   - Complemento (se houver)

2. Buscar temperatura e clima da cidade via OpenWeather:
   - Temperatura em °C
   - Descrição do clima em português

3. Layout moderno e responsivo:
   - Dark mode
   - Cards translúcidos (glassmorphism)
   - Botões com hover e animações suaves
   - Layout centralizado e agradável em diferentes tamanhos de tela

4. Experiência interativa:
   - Animação sutil da ilustração
   - Cards com efeito hover

---

## Como Executar

### 1. Faça o clone do projeto
```bash
git clone cepFinder
```

### 2. Acesse o diretório
```bash
cd /caminho/da/pasta/cepFinder
```

### 3. Instalar dependências
```bash
npm install
```

### 4. Rodar o projeto em ambiente de desenvolvimento
```bash
ng serve
# Acesse: http://localhost:4200
```

## 🔑 Configuração da API OpenWeather

No arquivo `api.service.ts`, substitua a variável `apiKeyOpenWeather` pela sua **API Key** do OpenWeather:

```typescript
private apiKeyOpenWeather = 'SUA_CHAVE_AQUI';
```

---

### Observações

A busca só funciona para CEPs válidos do Brasil.

O serviço de temperatura depende da cidade retornada pelo ViaCEP.

A aplicação utiliza TailwindCSS, então é necessário ter o PostCSS configurado no Angular.
