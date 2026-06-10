# Menu Dinamico API

API REST em Node.js, TypeScript, Express e MongoDB para gerenciamento de cardapio.

## Requisitos

- Node.js 20+
- Docker e Docker Compose (para execucao via containers)

## Rodando localmente

1. Instale as dependencias:

```bash
npm install
```

2. Crie o arquivo de ambiente:

```bash
cp .env-example .env
```

3. Ajuste as variaveis se necessario:

- PORT=3000
- MONGO_URI=mongodb://localhost:27017/menu

4. Inicie em modo desenvolvimento:

```bash
npm run dev
```

## Rodando com Docker Compose

O compose sobe dois servicos:

- api: aplicacao Node.js
- mongo: banco MongoDB

Comando para subir:

```bash
docker compose up --build
```

A API fica disponivel em:

- http://localhost:3000

Para parar e remover containers:

```bash
docker compose down
```

Para parar e remover tambem o volume de dados do Mongo:

```bash
docker compose down -v
```

## Scripts disponiveis

- npm run dev: sobe em desenvolvimento com reload
- npm run build: compila TypeScript para dist
- npm run start: executa build compilada

## Rotas principais

- POST /api/v1/menu
- GET /api/v1/menu
- GET /api/v1/menu/:id
- DELETE /api/v1/menu/:id

## Comandos úteis

1. Corrigir automaticamente a formatação

```bash
npm run format
```

2. Validar a formatação do código

```bash
npm run format:check
```
