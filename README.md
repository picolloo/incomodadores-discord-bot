# incomodadores-discord-bot

Bot para o [Discord](https://discord.com/new) para chamar o xesque.

Reproduz áudios clássicos dos Incomodadores SC.

## Commands

O bot tem apenas o comando que é:
Prefix: `xesque`

- `xesque [help]` ou `xesque` - mostra comandos disponiveis
- `xesque [option]` - reproduz o áudio da opção escolhida
- `xesque random` - reproduz um áudio aleatório

Exemplos:

```shell
xesque paradao-no-bailao
```

## Developing

You're going to need [Node.js](https://nodejs.org/en/) or [Docker](https://docs.docker.com/desktop/) installed.

1. Node.js

First install all dependencies:

```shell
$ npm i
```

Start the bot:

```shell
$ npm start
```

2. Docker

Build:

```shell
$ docker build -t xesque .
```

Run:

```shell
$ docker run xesque
```

### Adicionando novos audios ou comandos

Todos áudios disponíveis estão no folder `audios` e existe um Map com todos os comandas dos áudios no arquivo `audio.js`.
