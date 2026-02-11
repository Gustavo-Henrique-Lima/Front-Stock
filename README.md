# InsuMax - Frontend

Frontend da aplicação **InsuMax**, responsável pelo gerenciamento de
produtos e matérias-primas.

Aplicação construída com:

-   React
-   Vite
-   TypeScript
-   TailwindCSS
-   React Query
-   Zod
-   Docker

# Como rodar o projeto localmente

## Pré-requisitos

-   Node.js 18+ ou 20+
-   NPM 9+


## Clonando o repositório

### Via HTTP

``` bash
git clone https://github.com/seu-usuario/insumax-front.git
```

### Via SSH

``` bash
git clone git@github.com:seu-usuario/insumax-front.git
```

## Acesse o diretório

``` bash
cd insumax-front
```

## Instale as dependências

``` bash
npm install
```

ou

``` bash
npm i
```

## Configurar variáveis de ambiente

Crie um arquivo `.env` com o seguinte conteúdo na raiz do projeto:

``` env
VITE_API_BASE_URL=http://localhost:8080/
VITE_APP_NAME=InsuMax
VITE_OAUTH_CLIENT_ID=myclientid
VITE_OAUTH_CLIENT_SECRET=myclientsecret
```

> Todas as variáveis precisam começar com `VITE_` para serem
> acessíveis no Vite.

## Rodar o projeto

``` bash
npm run dev
```

Acesse:

    http://localhost:5173


# Build para produção

``` bash
npm run build
```

# Rodando com Docker

## Build da imagem

``` bash
docker build   --build-arg VITE_API_BASE_URL=http://localhost:8080   --build-arg VITE_APP_NAME=InsuMax   --build-arg VITE_OAUTH_CLIENT_ID=myclientid   --build-arg VITE_OAUTH_CLIENT_SECRET=myclientsecret   -t insumax-front .
```


## Executar o container

``` bash
docker run -p 5173:80 insumax-front
```

Acesse:

    http://localhost:5173


# Rodando via Docker Hub (Pull)

Caso a imagem esteja publicada no Docker Hub:

``` bash
docker pull seu-usuario/insumax-front:latest
```

Executar:

``` bash
docker run -p 3000:80 seu-usuario/insumax-front:latest
```


# Estrutura do Projeto

    src/
     ├── components/
     ├── hooks/
     ├── services/
     ├── features/
     ├── schemas/
     ├── pages/
     └── App.tsx

# Integração com Backend

A aplicação consome uma API REST configurada via:

    VITE_API_BASE_URL

#  Observações Importantes

-   Variáveis `VITE_` são injetadas no momento do build.
-   Alterações nas variáveis exigem novo build.
-   Client Secret não deve ser exposto em produção real.


