# clone-tabnews

Projeto do curso.dev, porém com algumas diferenças. Como meu foco no curso **não é** aprender programação em si, vou aproveitar a oportunidade para desenvolver algo mais experimental.

Atualmente, estou usando o framework [Vaden](https://vaden.dev/) para desenvolver a API em Dart. A escolha do Vaden, mesmo ainda não sendo stable, foi intencional — quero experimentar e contribuir com o ecossistema Dart no backend.

A ideia é que ao final do projeto, ele tenha as mesmas features do projeto original, mas sendo uma aplicação totalmente diferente.

## Instalação

Clone o repositório e entre na pasta do projeto.

```bash
git clone git@github.com:wevertonj/clone-tabnews.git
cd clone-tabnews
```

Instale as dependências do projeto.

```bash
dart pub get
```

## Execução

Para executar o projeto em modo de desenvolvimento:

```bash
dart run bin/main.dart
```

---

## Linha do Tempo

### Dezembro/2025 - Reinício com Dart Vaden

Após mais de um ano parado, decidi reiniciar o projeto do zero usando uma stack diferente:

- **Backend**: Dart com [Vaden](https://vaden.dev/) (framework ainda em desenvolvimento)
- **Motivação**: Experimentar o ecossistema Dart no backend e contribuir com um framework promissor

### 2023-2024 - Versão NestJS (Descontinuada)

A primeira versão do projeto foi desenvolvida usando:

- **Backend**: NestJS com Fastify
- **Banco de dados**: PostgreSQL
- **Hospedagem**: Railway (devido a problemas com Vercel para projetos NestJS)
- **Cliente planejado**: Flutter (web e mobile) com foco em animações

O projeto original incluía sistema de migrations com node-pg-migrate e API versionada via headers.
