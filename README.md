# ToDoApp

Demo do App



Bem-vindo à Lista de Tarefas, um aplicativo simples e eficaz desenvolvido em React Native. Aqui, você pode criar, visualizar e gerenciar suas listas de tarefas de maneira intuitiva. Utilizando o React Navigation para uma navegação fluida entre telas e uma integração com um banco de dados SQLite para armazenar informações essenciais. Este aplicativo é o resultado de uma jornada de aprendizado, onde exploramos conceitos fundamentais de desenvolvimento React Native, documentação de código, manipulação de banco de dados e implementação de animações de componentes.

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

- **@react-navigation/native**: Facilita a navegação entre as telas do aplicativo.
- **@react-navigation/native-stack**: Fornece uma pilha de navegação nativa para aprimorar a experiência do usuário.
- **expo**: Uma plataforma para criar aplicativos React Native com facilidade, incluindo ferramentas de desenvolvimento e bibliotecas integradas.
- **expo-sqlite**: Facilita a integração do SQLite no ambiente Expo para manipulação de banco de dados local.
- **expo-status-bar**: Componente que permite controlar a barra de status do aplicativo Expo.
- **react**: A biblioteca principal do React para construir interfaces de usuário.
- **react-native**: O framework para construção de aplicativos móveis usando React.
- **react-native-gesture-handler**: Biblioteca que fornece gestos nativos para melhorar a experiência do usuário.
- **react-native-reanimated**: Utilizado para criar animações.
- **react-native-safe-area-context**: Gerenciamento seguro de áreas visíveis em dispositivos móveis.
- **react-native-screens**: Facilita a criação de transições de tela eficientes e nativas.
- **react-native-status-bar-height**: Utilizado para obter a altura da barra de status no React Native.
- **react-native-uuid**: Biblioteca para gerar identificadores únicos universais (UUID).

## Banco de Dados

O aplicativo utiliza um banco de dados SQLite para armazenar informações sobre as listas de tarefas e suas respectivas tarefas. O arquivo `database.js` contém a lógica para abrir o banco de dados e realizar operações de leitura e escrita.

## Funcionalidades

### Tela Principal (`List.js`)

#### Adição de Nova Lista
- **Descrição:** Permite aos usuários criar uma nova lista de tarefas.
- **Função:**
  - `addList`: Captura o nome da nova lista, adiciona a lista ao banco de dados SQLite e atualiza a exibição da lista na tela.

#### Filtragem Dinâmica de Listas
- **Descrição:** Permite aos usuários pesquisar listas existentes com base no nome.
- **Função:**
  - `filterList`: Filtra dinamicamente as listas com base no texto de pesquisa e atualiza a exibição da lista.

#### Seleção e Exclusão de Listas
- **Descrição:** Possibilita aos usuários selecionar e excluir uma ou mais listas.
- **Função:**
  - `handleSelectItem`: Entra ou sai do modo de exclusão, seleciona/deseleciona listas e exclui as listas selecionadas do banco de dados.
  - `handleDeleteSelectedLists`: Exclui as listas selecionadas do banco de dados e atualiza a exibição da lista.

### Tela de Lista de Tarefas (`TaskList.js`)

#### Adição de Nova Tarefa
- **Descrição:** Permite aos usuários adicionar uma nova tarefa a uma lista específica.
- **Função:**
  - `addTaskToList`: Captura a descrição da nova tarefa, a adiciona à lista associada no banco de dados SQLite e atualiza a exibição da lista de tarefas.

#### Marcação de Tarefa como Concluída
- **Descrição:** Permite aos usuários marcar uma tarefa como concluída ou desmarcar como pendente.
- **Função:**
  - `handleToggleDone`: Altera o estado "done" da tarefa no banco de dados e atualiza a exibição da lista de tarefas.

#### Exclusão de Tarefa
- **Descrição:** Possibilita aos usuários excluir uma tarefa específica de uma lista.
- **Função:**
  - `handleDeleteTask`: Remove a tarefa do banco de dados e atualiza a exibição da lista de tarefas.

## Instalação e Execução

Para executar o aplicativo localmente utilizando o Expo, siga os seguintes passos:

1. Certifique-se de ter o Node.js e o npm instalados em sua máquina.
2. Clone o repositório do aplicativo.
3. Navegue até o diretório do projeto no terminal.
4. Execute `npm install` para instalar as dependências.
5. Execute `npx expo start` para iniciar o servidor de desenvolvimento com o Expo. Ou execute `npm start` para iniciar apenas com React Native.
6. Abra o aplicativo em um emulador, dispositivo físico ou use o Expo Go no seu dispositivo móvel.

## Considerações Finais

Este aplicativo foi desenvolvido como parte  de uma jornada de aprendizado, explorando conceitos essenciais de desenvolvimento React Native, documentação de código, manipulação de banco de dados e implementação de animações de componentes.

Experimente a praticidade e a eficácia da Lista de Tarefas e mantenha-se organizado no seu dia a dia!
