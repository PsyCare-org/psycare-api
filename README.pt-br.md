# PsyCare API
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/PsyCare-org/psycare-api/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/PsyCare-org/psycare-api/blob/main/README.pt-br.md)

## Sobre
API Rest que provê autenticação e operações CRUD, para gerenciar os dados relacionados à aplicação PsyCare. As principais tecnologias utilizadas no desenvolvimento foram:
* [NestJS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [VideoSDK](https://www.videosdk.live/)

## Começando
### Pré-requisitos
Você precisará do [NodeJS](https://nodejs.org/en/download/), um gerenciador de pacotes de sua escolha e do banco de dados [PostgreSQL](https://www.postgresql.org/).

### Variáveis de ambiente
Na raiz do projeto, crie um arquivo chamado `.env`, com o seguinte conteúdo, preencendo-o com os seus valores:
```
PORT=<porta onde a API irár rodar>
DB_HOST=<host do banco de dados>
DB_PORT=<porta do banco de dados>
DB_USERNAME=<usuário do banco de dados>
DB_PASSWORD=<senha do usuário do banco de dados>
DB_NAME=<nome do banco de dados>
AUTH_PRIVATE_KEY=<chave secreta para a encriptação(jwt) e criação das chaves de usuário>
AUTH_PUBLIC_KEY=<chave pública para a encriptação(jwt) e criação das chaves de usuário>
CALL_API_URL=<URL da API da plataforma VideoSDK>
CALL_TOKEN=<Token de API gerado dentro da plataforma VideoSDK>
```

O arquivo `.env.example` contém um exemplo de como o arquivo de variáveis de ambiente deve se parecer.

### Instalação
1. Clone o repositório
   ```sh
   git clone https://github.com/PsyCare-org/psycare-api
   ```
2. Instale os pacotes
   ```sh
   npm install
   ```
4. Execute-o
   ```sh
   npm start
   ```

OBS.: Antes de executar a aplicação talvez faça-se necessário criar um banco de dados com o nome informado nas variáveis de ambiente.

## Utilização
A API pode ser utilizada isoladamente, entretanto, ela foi desenvolvida pensada exclusivamente para ser o back-end do projeto.

As rotas disponibilizadas podem ser encontradas uma vez que a aplição está rodando, dentro do swagger. O mesmo está na rota `/api`.

Além disso, a aplicação também possui uma seed com dados falsos para o banco de dados. Basta executar  `npm run seed:run`.

## Licensa
Distribuído sob a licença MIT. Veja `LICENSE.txt` para mais informações.