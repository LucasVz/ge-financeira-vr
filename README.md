# Gestão Financeira — Back-end

API do sistema de gestão financeira da Clínica Rebeca Vaz. O back-end armazena categorias, serviços, formas de pagamento, entradas e saídas, disponibilizando esses dados para o front-end e para os relatórios financeiros.

A API é executada por padrão em `http://localhost:3000` e utiliza PostgreSQL como banco de dados.

## Funcionalidades

- Cadastro, consulta, alteração e remoção de categorias;
- cadastro, consulta, alteração e remoção de serviços;
- associação de serviços a categorias;
- cadastro e gerenciamento de formas de pagamento;
- registro e gerenciamento de entradas;
- registro e gerenciamento de saídas;
- persistência dos dados no PostgreSQL;
- acesso ao banco com Prisma ORM;
- CORS habilitado para o front-end local.

## Tecnologias

- Node.js;
- NestJS 11;
- TypeScript;
- PostgreSQL;
- Prisma ORM 7;
- adapter PostgreSQL do Prisma;
- Jest para testes.

## Pré-requisitos

Antes de iniciar, instale:

- Node.js 20 ou superior;
- npm ou pnpm;
- PostgreSQL 15 ou superior, ou Docker para executar o banco em contêiner.

## Configuração do banco de dados

Crie um arquivo `.env` na raiz deste projeto:

```env
DATABASE_URL="postgresql://admin:admin_password@localhost:5432/clinica_db?schema=public"
PORT=3000
```

Se estiver usando outro usuário, senha, porta ou nome de banco, ajuste a `DATABASE_URL`.

### Opção 1: PostgreSQL com Docker

O arquivo `docker-compose.yml` deste diretório inicia um PostgreSQL 15 já configurado para os valores mostrados acima.

```bash
docker compose up -d postgres
```

Para verificar se o contêiner está ativo:

```bash
docker compose ps
```

Para encerrar o banco:

```bash
docker compose down
```

### Opção 2: PostgreSQL instalado na máquina

Crie um banco chamado `clinica_db` e defina na `DATABASE_URL` um usuário que tenha permissão para criar e alterar tabelas nesse banco.

## Como executar

Instale as dependências:

```bash
npm install
```

Gere o cliente do Prisma:

```bash
npx prisma generate
```

Aplique as migrações no banco:

```bash
npx prisma migrate deploy
```

Inicie a API em modo de desenvolvimento:

```bash
npm run start:dev
```

A API ficará disponível em [http://localhost:3000](http://localhost:3000). Uma requisição `GET /` deve retornar `Hello World!`.

Com pnpm, os comandos equivalentes são:

```bash
pnpm install
pnpm exec prisma generate
pnpm exec prisma migrate deploy
pnpm start:dev
```

## Endpoints

Cada recurso possui endpoints REST para cadastro e gerenciamento dos dados.

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/categories` | Lista as categorias |
| `POST` | `/categories` | Cadastra uma categoria |
| `GET` | `/categories/:id` | Consulta uma categoria |
| `PATCH` | `/categories/:id` | Atualiza uma categoria |
| `DELETE` | `/categories/:id` | Remove uma categoria |
| `GET` | `/services` | Lista os serviços e suas categorias |
| `POST` | `/services` | Cadastra um serviço |
| `GET` | `/services/:id` | Consulta um serviço |
| `PATCH` | `/services/:id` | Atualiza um serviço |
| `DELETE` | `/services/:id` | Remove um serviço |
| `GET` | `/payment-methods` | Lista as formas de pagamento |
| `POST` | `/payment-methods` | Cadastra uma forma de pagamento |
| `GET` | `/incomes` | Lista as entradas |
| `POST` | `/incomes` | Registra uma entrada |
| `GET` | `/expenses` | Lista as saídas |
| `POST` | `/expenses` | Registra uma saída |

As rotas de formas de pagamento, entradas e saídas também aceitam consulta por ID, atualização com `PATCH` e remoção com `DELETE` usando `/:id`.

## Exemplos de requisições

Cadastrar uma categoria:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/categories" -ContentType "application/json" -Body '{"name":"Estética Facial"}'
```

Cadastrar um serviço, usando o ID de uma categoria existente:

```powershell
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/services" -ContentType "application/json" -Body '{"name":"Limpeza de pele","categoryId":1}'
```

## Modelos de dados

O schema do Prisma possui cinco entidades principais:

- `Category`: categoria usada para organizar serviços;
- `Service`: serviço vinculado a uma categoria;
- `PaymentMethod`: forma de pagamento aceita;
- `Income`: entrada vinculada a um serviço e a uma forma de pagamento;
- `Expense`: saída com descrição, valor, tipo e data.

O schema está em `prisma/schema.prisma` e as migrações estão em `prisma/migrations/`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia com recarregamento automático |
| `npm run build` | Compila o projeto |
| `npm run start:prod` | Executa a versão compilada |
| `npm run lint` | Verifica e corrige problemas de lint |
| `npm run test` | Executa os testes unitários |
| `npm run test:e2e` | Executa os testes de integração |
| `npm run test:cov` | Gera o relatório de cobertura |

Para executar em modo de produção:

```bash
npm run build
npm run start:prod
```

## Estrutura principal

```text
src/
  categories/       Recurso de categorias
  services/         Recurso de serviços
  payment-methods/  Recurso de formas de pagamento
  incomes/          Recurso de entradas
  expenses/         Recurso de saídas
  prisma/            Conexão compartilhada com o banco
prisma/
  schema.prisma      Modelos do banco
  migrations/        Histórico de migrações
```

## Solução de problemas

### A API inicia, mas não conecta ao banco

Confira se o PostgreSQL está ativo, se o banco existe e se usuário, senha, host e porta da `DATABASE_URL` estão corretos.

### Erro informando que o cliente Prisma não foi gerado

Execute:

```bash
npx prisma generate
```

### As tabelas não existem

Aplique as migrações:

```bash
npx prisma migrate deploy
```

### A porta 3000 já está em uso

Encerre o processo que usa a porta ou altere `PORT` no arquivo `.env`. Se mudar a porta, atualize também o endereço da API usado pelo front-end.
