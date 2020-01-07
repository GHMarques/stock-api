# stock-api
O objetivo do projeto é desenvolver uma API para controle de estoque com o backend em C# e o frontend em React.

## Arquitetura do projeto
O projeto é dividido em três partes: banco de dados, backend e frontend. A seguir será detalhado o funcionamento de cada uma e as decisões de projeto.

### Banco de dados
O banco de dados escolhido foi o SQLite. Tal biblioteca foi escolhida devido a sua praticidade de administração e implementação em projetos de pequeno porte.

### Backend
O backend do projeto foi desenvolvido na linguagem de programação C# e com o framework .NET. A solução contém dois projetos: um responsável pela API e outro com testes unitários. A API é dividida em:
  * `Controllers`: responsável pelas rotas de entrada da aplicação;
  * `Models`: contém os modelos do projeto;
  * `Repository`: responsável por isolar a lógica de acesso ao banco de dados. Por questões de organização e boas práticas, toda classe desse repositório é uma implementação de sua respectiva interface. 

O framework utilizado para realizar a persistência dos dados foi o Entity Framework, uma vez que ele é completo e já vem integrado ao .NET.

As rotas da API são:
  * `GET`: /Product -> GetAll() -> Retorna todos os produtos
  * `GET`: /Product/:id -> GetById(id) -> Retorna o produto de acordo com o id passado como parâmetro via url
  * `POST`: /Product -> Create() -> Cria um novo produto (recebe o json por meio do body da requisição)
  * `PUT`: /Put -> Update() -> Atualiza as informações de um produuto (recebe o json por meio do body da requisição)
  * `DELETE`: /Product/:id -> Delete(id) -> Deleta o produto que possui o id passado como parâmetro via url
  
O backend também possui alguns testes unitários.
  
### Frontend
O frontend do projeto foi desenvolvido em React. A divisão foi:
  * `assets`: pasta para armazenar recursos como imagem, gif etc.
  * `components`: armazena os componentes divididos nas seguintes categorias:
    * `navigations`: componentes de navegação presentes em todas as páginas
    * `pages`: páginas do projeto
    * `ui`: componentes de interfaces utilizados em uma ou mais páginas
  * `services`: responsável por realizar as chamadas externas ao front. Utiliza o módulo axios.

Por opção, o layout é simples e contém os principais itens para navegação do usuário: recurso de loading, formulários bem espaçados, claros, com validações e confirmação antes de excluir. Os principais recursos são de módulos do Bootstrap e os ícones são do Font Awesome. Por meio da navbar, o usuário pode acessar as duas páginas do sistema a qualquer momento.

Para auxiliar nas boas práticas, foi utilizado o ESLint com o padrão fornecido pelo Airbnb.

## Execução
Na pasta raiz do backend deve-se executar `dotnet watch -p ./Stock/Stock.csproj run` para iniciar a execução da API ou `dotnet test` para iniciar os testes.
Na pasta raiz do frontend, basta executar o `npm start`.

### Trabalho futuro
Segue alguns recursos que podem agregar ao projeto mas que não foram desenvolvidos por limitação de tempo: testes mais completos tanto no back quanto no front, componentes mais elaborados no front, por exemplo, busca em tempo real, paginador etc.
