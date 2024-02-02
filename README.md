# Documentação do Aplicativo

O aplicativo é uma lista de tarefas simples que permite aos usuários criar, visualizar e gerenciar listas de tarefas. Ele é desenvolvido em React Native, utilizando o React Navigation para a navegação entre telas e uma integração com um banco de dados SQLite para armazenar as informações das listas e tarefas.

## Estrutura de Diretórios

O código do aplicativo está organizado em uma estrutura de diretórios padrão para um projeto React Native:

- `src/`: Contém o código-fonte do aplicativo.
  - `screen/`: Contém os componentes de tela do aplicativo.
    - `List/`: Tela principal que exibe a lista de listas de tarefas.
      - `List.js`: Arquivo que contém a lógica e componentes específicos da tela principal.
      - `styles.js`: Arquivo que contém os estilos específicos da tela principal.
    - `TaskList/`: Tela que exibe as tarefas de uma lista específica.
      - `TaskList.js`: Arquivo que contém a lógica e componentes específicos da tela de lista de tarefas.
      - `styles.js`: Arquivo que contém os estilos específicos da tela de lista de tarefas.

## Dependências Principais

O aplicativo faz uso de várias bibliotecas externas para fornecer funcionalidades específicas. As principais dependências incluem:

- **React Navigation**: Utilizado para gerenciar a navegação entre as telas do aplicativo.
- **react-native-gesture-handler**: Biblioteca que fornece gestos nativos para melhorar a experiência do usuário.
- **react-native-reanimated**: Utilizado para criar animações fluidas nas transições de tela.
- **react-native-uuid**: Biblioteca para gerar identificadores únicos universais (UUID).
- **@expo/vector-icons**: Conjunto de ícones vetorizados utilizados para melhorar a estética do aplicativo.

## Banco de Dados

O aplicativo utiliza um banco de dados SQLite para armazenar informações sobre as listas de tarefas e suas respectivas tarefas. O arquivo `database.js` contém a lógica para abrir o banco de dados e realizar operações de leitura e escrita.

## Funcionalidades

### Tela Principal (`List.js`)

#### Adição de Nova Lista
- **Descrição:** Permite aos usuários criar uma nova lista de tarefas.
- **Função:**
- `filterList`:
  - Captura o nome da nova lista.
  - Adiciona a lista ao banco de dados SQLite.
  - Atualiza a lista de listas exibida na tela.

#### Pesquisa de Listas
- **Descrição:** Permite aos usuários pesquisar listas existentes com base no nome.
- **Função:**
  - Filtra as listas com base no texto de pesquisa.
  - Atualiza dinamicamente a exibição da lista de listas.

#### Seleção e Exclusão de Listas
- **Descrição:** Possibilita aos usuários selecionar e excluir uma ou mais listas.
- **Função:**
  - Entra ou sai do modo de exclusão.
  - Seleciona/deseleciona listas para exclusão.
  - Exclui as listas selecionadas do banco de dados.
  - Atualiza a lista de listas exibida na tela.

### Tela de Lista de Tarefas (`TaskList.js`)

#### Adição de Nova Tarefa
- **Descrição:** Permite aos usuários adicionar uma nova tarefa a uma lista específica.
- **Função:**
  - Captura a descrição da nova tarefa.
  - Adiciona a tarefa à lista associada no banco de dados SQLite.
  - Atualiza a lista de tarefas exibida na tela.

#### Marcação de Tarefa como Concluída
- **Descrição:** Permite aos usuários marcar uma tarefa como concluída ou desmarcar como pendente.
- **Função:**
  - Altera o estado "done" da tarefa no banco de dados.
  - Atualiza a exibição da lista de tarefas.

#### Exclusão de Tarefa
- **Descrição:** Possibilita aos usuários excluir uma tarefa específica de uma lista.
- **Função:**
  - Remove a tarefa do banco de dados.
  - Atualiza a lista de tarefas exibida na tela.

## Instalação e Execução

Para executar o aplicativo localmente utilizando o Expo, siga os seguintes passos:

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
2. Clone o repositório do aplicativo.
3. Navegue até o diretório do projeto no terminal.
4. Execute `npm install` para instalar as dependências.
5. Execute `npx expo start` para iniciar o servidor de desenvolvimento com o Expo. Ou execute `npm start` para iniciar apenas com React Native.
6. Abra o aplicativo em um emulador, dispositivo físico ou use o Expo Go no seu dispositivo móvel.
