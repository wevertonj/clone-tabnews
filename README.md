# clone-tabnews

Projeto do curso.dev, porém com algumas diferenças. Como meu foco no curso **não é** aprender programação em si, vou aproveitar a oportunidade para desenvolver algo mais experimental.

Enquanto o curso usará o Next.js para o projeto todo, eu vou dividir ele em dois, a API usando Nest.js e o client com versão web e mobile usando o Flutter.

Para a API, quero usar o Nest.js apenas como uma camada que conecta ao mundo externo, sem que a aplicação dependa dele.

Para o client, quero brincar bastante com as animações, deixar ele cheio de frufru que encha os olhos dos usuários.

A ideia é que ao final do projeto, ele tenha as mesmas features do projeto original, mas sendo uma aplicação totalmente diferente.

## Instalação

Clone o repositório e entre na pasta do projeto.

```bash
git clone git@github.com:wevertonj/clone-tabnews.git
cd clone-tabnews
```

Instale as dependências do projeto.

```bash
npm install
```

Os imports deste projetos utilizam `module-alias` e para que ele obtenha os caminhos corretos, é preciso adicionar a seguinte variável de ambiente.

```bash
APP_ENV=development
```

Esta variável só é necessária para o ambiente de desenvolvimento, pois a validação feita em `src/main.ts` verifica apenas se o valor é igual a `development`.

Na raiz do projeto há um arquivo `.env.example`, que pode ser usado para criar um arquivo `.env` com as variáveis de ambiente necessárias.

## Execução

Para executar o projeto, use o comando `start`.

```bash
npm start
```

## Desafios

### Hospedagem

O curso.dev usa a Vercel para hospedar o projeto, que de inicio deu erro ao tentar fazer build do projeto Nest.js. Durante as buscas por soluções, vi um comentário de que a inicialização do projeto Nest.js é muito lenta, então optei por hospedar na Render, que tem um plano gratuito e já usei anteriormente.
