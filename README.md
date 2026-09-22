# melos

Aplicação web para gerir playlists: biblioteca de faixas, playlists,
favoritas, pesquisa e duração total.

É a versão web de um gestor de playlists que comecei como projeto de linha de
comandos em Python. O domínio é deliberadamente pequeno — o objetivo do projeto
é percorrer uma stack fullstack completa, do browser à base de dados, incluindo
containers e deployment.

> **Estado:** em construção. Fase 1 de 12 (ver *Roadmap* abaixo).
> Ainda não há aplicação para correr.

---

## Stack

| Camada      | Tecnologia                                            |
|-------------|-------------------------------------------------------|
| Frontend    | React · Vite · TypeScript · Tailwind CSS · React Router |
| Backend     | Python · FastAPI · Pydantic · Uvicorn                 |
| Base de dados | PostgreSQL · SQLAlchemy 2.0 · Alembic               |
| Autenticação | JWT · passlib/bcrypt                                 |
| Ferramentas | uv · ruff                                             |
| Containers  | Docker · Docker Compose · nginx                       |

A fronteira entre frontend e backend é um contrato HTTP + JSON. O FastAPI gera
o esquema OpenAPI automaticamente, disponível em `/docs`.

---

## Estrutura

```
melos/
├── backend/        # FastAPI + SQLAlchemy
│   ├── app/
│   └── alembic/
├── frontend/       # React + Vite
│   └── src/
└── compose.yaml
```

---

## Como correr

### Requisitos

- Docker e Docker Compose
- [uv](https://github.com/astral-sh/uv)
- Node.js

### Base de dados

```bash
docker compose up -d db
```

O PostgreSQL fica em `localhost:5432`. Os dados persistem num volume nomeado,
por isso um `docker compose down` não os apaga.

### Backend

*Ainda não implementado (Fase 2).*

```bash
cd backend
uv sync
uv run alembic upgrade head
uv run uvicorn app.main:app --reload
```

API em `http://localhost:8000`, documentação interativa em
`http://localhost:8000/docs`.

### Frontend

*Ainda não implementado (Fase 5).*

```bash
cd frontend
npm install
npm run dev
```

Aplicação em `http://localhost:5173`.

### Tudo em containers

*Ainda não implementado (Fase 9).*

```bash
docker compose up --build
```

---

## Funcionalidades

### Primeira versão

- [ ] Biblioteca de faixas: listar, adicionar, editar, remover
- [ ] Playlists: criar, renomear, apagar
- [ ] Adicionar e remover faixas de uma playlist
- [ ] Marcar faixas como favoritas
- [ ] Pesquisa por título ou artista
- [ ] Duração total de uma playlist
- [ ] Vista ordenada da biblioteca (por artista ou duração)

### Fora da primeira versão

Contas de utilizador, reprodução de áudio, integração com serviços de streaming,
capas de álbum, importar/exportar, playlists automáticas, partilha e versão
mobile.

---

## Roadmap

```
 1. Setup: uv + PostgreSQL em Docker
 2. FastAPI a responder
 3. Modelo de dados + migrações
 4. API CRUD completa
 5. Frontend com dados estáticos
 6. Ligar o frontend à API
 7. Favoritas, pesquisa, ordenação
 8. Autenticação (JWT)
 9. Containerizar backend e frontend
10. Deployment
11. Polish
```

---

## Notas

Projeto de aprendizagem. O código é escrito por mim; as notas de design e a
justificação de cada escolha da stack vivem num vault de Obsidian fora do
repositório.
