# EconomiaMZ — Monitor da Inflação

Aplicação Web académica para consultar e interpretar a evolução histórica da inflação anual em Moçambique. O projecto apresenta a taxa mais recente disponível no conjunto de dados, permite explorar a série, comparar anos em pontos percentuais e preparar um resumo por e-mail. Não fornece previsões nem dados em tempo real.

## Estado e ligações

- Repositório público com o nome previsto `pwebii-2026-grupo9-economiamz`: **por confirmar**. O remote Git actualmente configurado aponta para `martin-langa/EconomiaMZ`; a correspondência com o repositório público previsto ainda não foi verificada.
- Aplicação publicada no GitHub Pages: **pendente**.
- Os usernames GitHub da equipa e os links públicos individuais ainda não foram fornecidos.

## Tecnologias

- Vue 3 e Composition API
- Vite
- Vue Router, com hash history para suportar publicação em subdirectório
- Chart.js e vue-chartjs
- `@emailjs/browser` para o serviço de e-mail
- npm, com versões exactas registadas no `package-lock.json`

## Requisitos e execução

É necessário Node.js 22 LTS e npm. Na pasta do projecto:

```bash
git clone <URL_CONFIRMADO_DO_REPOSITORIO>
cd EconomiaMZ
npm ci
npm run dev
```

Substitua o marcador pelo URL do repositório quando o endereço público for confirmado. O Vite apresenta no terminal o endereço local. Para executar os testes configurados (actualmente não existe script `test`) e verificar a compilação/versão de produção:

```bash
npm run test --if-present
npm run build
npm run preview
```

Não existe actualmente um script de testes automatizados no `package.json`. `npm test` não está configurado; o workflow executa `npm run test --if-present` e sempre exige que o build termine com sucesso.

## Estrutura e integração

```text
src/
├── components/   # Navbar e componentes de interface reutilizáveis
├── composables/  # Estado e carregamento de dados (integração pendente)
├── router/       # Rotas centrais da aplicação
├── services/     # Integração do serviço de e-mail
└── views/        # Início, indicadores, detalhe e página 404
public/dados/     # Dataset JSON estático (integração pendente)
```

O router define `/`, `/indicadores`, `/indicadores/:codigo` e uma rota de fallback 404. Usa hash history, pelo que as páginas são navegáveis e actualizáveis sem configuração de fallback no servidor. O detalhe disponível na interface integrada usa o código `inflacao`.

`src/composables/useInflacao.js` carrega `public/dados/inflacao.json` com `fetch()` e `import.meta.env.BASE_URL`, valida as observações e expõe estados de carregamento, erro, último registo e variação. Os componentes de gráfico, filtro, comparação e e-mail são reutilizados pelas views.

## Dados, fontes e licenças

O plano do grupo identifica a série como inflação anual de preços ao consumidor (`FP.CPI.TOTL.ZG`, Moçambique), com fonte original *World Development Indicators* do Banco Mundial e série consultada no FRED `FPCPITOTLZGMOZ`:

- [FRED — FPCPITOTLZGMOZ](https://fred.stlouisfed.org/series/FPCPITOTLZGMOZ)
- [Banco Mundial — FP.CPI.TOTL.ZG para Moçambique](https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=MZ)

A cópia JSON incluída contém cinco observações anuais, de 2021 a 2025, e identifica a consulta em 20/11/2026. É um snapshot estático, não uma actualização automática. O plano do grupo regista a indicação FRED *Public Domain / Citation Requested*; as condições aplicáveis na fonte original e a atribuição final precisam de confirmação antes da entrega.

## Serviço de e-mail

O formulário usa `@emailjs/browser`. Para activar o envio, configure localmente `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` e `VITE_EMAILJS_PUBLIC_KEY`, usando como referência `.env.example`. Crie um `.env` local (já ignorado pelo Git) e não inclua valores reais em commits. Variáveis `VITE_` são incorporadas no código do browser: use apenas identificadores/chaves públicas permitidos pelo EmailJS, restrinja os domínios autorizados e nunca coloque segredos privados no frontend. Sem configuração, o serviço actual opera em modo de demonstração e não envia mensagens.

O envio real e a configuração externa ainda não foram confirmados. Consulte também as [condições de utilização do EmailJS](https://www.emailjs.com/legal/terms-of-service/).

## Equipa

- Arão Sibinde
- Khrissy Marcelo
- Martin Langa
- Xheymon Bucuane

Os perfis GitHub e números de estudante serão acrescentados quando forem fornecidos e confirmados.

## Utilização de inteligência artificial

Foi utilizado OpenAI Codex como assistente de programação nesta contribuição de estrutura, navegação, configuração e documentação. A ferramenta apoiou a análise e preparação de alterações; a equipa deve rever o código e adequar esta declaração às regras académicas e às ferramentas efectivamente usadas pelos restantes membros. Não se atribui aqui utilização de IA aos outros integrantes.

## Publicação

Em **Settings → Pages → Build and deployment**, seleccione **GitHub Actions**. Cada push para `production` executa o workflow `.github/workflows/deploy.yml`, que compila o projecto e publica `dist`. O Vite usa o caminho `/EconomiaMZ/` para servir os recursos e o dataset. Se o ambiente `github-pages` limitar os branches autorizados, inclua `production`.
