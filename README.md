# EconomiaMZ — Monitor da Inflação

Aplicação Web académica desenvolvida no âmbito da disciplina de Programação Web II, com o objectivo de facilitar a consulta, visualização e interpretação da evolução histórica da inflação anual em Moçambique.

A aplicação permite consultar a taxa de inflação mais recente disponível no conjunto de dados, visualizar a evolução histórica através de gráficos, comparar diferentes anos e preparar resumos para partilha por e-mail.

## 1. Problema

A informação sobre a inflação em Moçambique encontra-se, frequentemente, em relatórios, tabelas estatísticas e diferentes plataformas de consulta, o que pode dificultar o acesso, a interpretação e a comparação dos dados por parte dos estudantes, cidadãos e outros interessados.

O EconomiaMZ procura simplificar este processo através de uma interface centralizada, intuitiva e visual, permitindo compreender melhor a evolução da inflação ao longo dos anos e facilitar a consulta dos dados estatísticos.

## 2. Funcionalidades

- Consulta da taxa de inflação mais recente disponível.
- Visualização da evolução histórica da inflação através de gráficos.
- Exploração dos dados referentes a diferentes anos.
- Comparação da inflação entre dois anos, com apresentação da diferença em pontos percentuais.
- Preparação e envio de resumos por e-mail.
- Interface responsiva e navegação entre páginas.

> A aplicação utiliza dados históricos e não disponibiliza previsões, actualizações em tempo real ou aconselhamento financeiro.

## 3. Publicação e repositório

- **GitHub:** [EconomiaMZ — Repositório](https://github.com/martin-langa/EconomiaMZ)
- **GitHub Pages:** [EconomiaMZ — Aplicação Web](https://martin-langa.github.io/EconomiaMZ/#/)

## 4. Membros do grupo 09

| Nome | Nº de estudante | GitHub |
|---|---:|---|
| Arão Sibinde | 8090 | [AraoSibindeJr](https://github.com/AraoSibindeJr) |
| Khrissy Marcelo | 7930 | [khrissy9](https://github.com/khrissy9) |
| Martin Langa | 8556 | [martin-langa](https://github.com/martin-langa) |
| Xheymon Bucuane | 8478 | [xheymonFlavioBucuane](https://github.com/xheymonFlavioBucuane) |

## 5. Tecnologias utilizadas

- **Vue 3** — desenvolvimento da interface e componentes reativos.
- **Composition API** — organização da lógica dos componentes.
- **Vite** — ferramenta de desenvolvimento e compilação.
- **Vue Router** — navegação entre páginas.
- **Chart.js e vue-chartjs** — visualização gráfica dos dados.
- **EmailJS (`@emailjs/browser`)** — integração para envio de e-mails.
- **npm** — gestão de dependências.

## 6. Fontes de dados

Os dados de inflação utilizados na aplicação correspondem ao indicador de inflação anual dos preços ao consumidor em Moçambique, disponibilizado pelo Banco Mundial através do conjunto de dados *World Development Indicators*.

- **Indicador:** Inflation, consumer prices (annual %).
- **Código do indicador:** `FP.CPI.TOTL.ZG`.
- **País:** Moçambique.
- **Período disponibilizado na aplicação:** 2021–2025.

Fontes consultadas:

- [FRED — Inflation, Mozambique (FPCPITOTLZGMOZ)](https://fred.stlouisfed.org/series/FPCPITOTLZGMOZ)
- [World Bank — Inflation, consumer prices (annual %), Mozambique](https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=MZ)

Os dados são armazenados localmente num ficheiro JSON, permitindo que a aplicação funcione sem depender de uma ligação à API durante a utilização normal.

## 7. Serviço de e-mail

A aplicação utiliza o **EmailJS**, através do pacote `@emailjs/browser`, para a integração do envio de e-mails.

O serviço permite preparar e enviar resumos relacionados com os dados de inflação, sem necessidade de implementar um servidor de e-mail próprio.

A integração requer a configuração das respectivas variáveis de ambiente.

## 8. Requisitos

Para executar o projecto localmente, é necessário ter instalado:

- [Node.js 22 LTS](https://nodejs.org/)
- npm (incluído na instalação do Node.js)
- Git

## 9. Instalação e execução local

### 9.1. Clonar o repositório

```bash
git clone https://github.com/martin-langa/EconomiaMZ.git
```

### 9.2. Entrar na pasta do projecto

```bash
cd EconomiaMZ
```

### 9.3. Instalar as dependências

```bash
npm install
```

### 9.4. Configurar as variáveis de ambiente

Criar um ficheiro `.env` na raiz do projecto e definir as variáveis necessárias para a integração do EmailJS.

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

> Os valores das variáveis devem ser obtidos na conta e configuração do EmailJS. Não incluir credenciais privadas ou valores reais no repositório público.

### 9.5. Executar a aplicação

```bash
npm run dev
```

Após a execução, o Vite apresentará no terminal o endereço local para aceder à aplicação através do navegador.

## 10. Compilação e pré-visualização de produção

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar localmente a versão compilada:

```bash
npm run preview
```

## 11. Estrutura do projecto

```text
EconomiaMZ/
├── public/
│   └── dados/
│       └── inflacao.json
├── src/
│   ├── components/
│   ├── composables/
│   ├── router/
│   ├── services/
│   └── views/
├── .env
├── package.json
├── package-lock.json
└── README.md
```

- `components/` — componentes reutilizáveis da interface.
- `composables/` — lógica de estado, carregamento e processamento de dados.
- `router/` — configuração das rotas da aplicação.
- `services/` — serviços externos, incluindo a integração do e-mail.
- `views/` — páginas da aplicação.
- `public/dados/` — ficheiro JSON com os dados históricos da inflação.

## 12. Actualização dos dados

O projecto disponibiliza um mecanismo de importação dos dados através do comando:

```bash
npm run dados:importar
```

Este comando consulta a API do Banco Mundial, valida os registos referentes ao período configurado, organiza os dados e actualiza o ficheiro JSON local.

A aplicação utiliza o ficheiro JSON resultante, garantindo que a consulta dos dados não depende da disponibilidade da API externa durante a execução.

---

**EconomiaMZ — Monitor da Inflação**  
Projecto académico desenvolvido pelo Grupo 09 no âmbito da disciplina de Programação Web II.
