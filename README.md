# CodeLeap Network

Este é um projeto de teste para a CodeLeap, desenvolvido com React e TypeScript. É uma rede social simples onde os usuários podem criar, editar e excluir posts.

## Funcionalidades

- Autenticação simples com nome de usuário
- Criação de posts com título e conteúdo
- Edição de posts existentes
- Exclusão de posts
- Visualização de posts em tempo real
- Interface responsiva e moderna
- Formatação automática de data/hora dos posts

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

## Executando o projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:5173`

## Tecnologias utilizadas

- React 18
- TypeScript
- Tailwind CSS para estilização
- Axios para requisições HTTP
- React Router DOM para roteamento
- React Query para gerenciamento de estado e cache
- Vite como bundler e servidor de desenvolvimento

## Estrutura do Projeto

```
src/
  ├── components/         # Componentes reutilizáveis
  │   ├── CreatePost.tsx  # Formulário de criação de posts
  │   ├── EditPostModal.tsx    # Modal de edição
  │   └── DeleteConfirmationModal.tsx  # Modal de confirmação
  ├── pages/             # Páginas da aplicação
  │   └── Home.tsx       # Página principal
  ├── App.tsx            # Componente raiz
  └── main.tsx           # Ponto de entrada
```

## API

O projeto utiliza a API da CodeLeap disponível em:
- Base URL: `https://dev.codeleap.co.uk/careers/`

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request 