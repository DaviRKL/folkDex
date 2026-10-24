# 📇 folkDex 

> Resolução do **React Challenge 001** da plataforma [Code Challenges](https://codechallenges.com.br).

O **folkDex** é uma aplicação de descoberta de pessoas construída com React e TypeScript. O projeto consome a Random User API para gerar uma listagem paginada de perfis, implementando filtros reativos avançados, sincronização de estado via URL e suporte a múltiplos idiomas e temas.

---

## 🎯 O Que Foi Pedido Inicialmente

O desafio original propunha a criação de uma interface de listagem e perfil de usuários seguindo um protótipo no Figma, com os seguintes requisitos estritos:

**Requisitos Funcionais (RF):**
- **RF1:** Utilizar a API `randomuser.me` para buscar informações.
- **RF2:** Listar pessoas em uma tabela/lista.
- **RF3:** Visualizar o perfil detalhado de uma pessoa específica.
- **RF4:** Paginar a lista de pessoas.
- **RF5:** Ocultar/limpar o valor do campo "password" retornado pela API.

**Regras de Negócio (RN):**
- **RN1:** Apresentar 10 pessoas por página.
- **RN2:** Permitir pesquisa pelo primeiro/último nome.
- **RN3:** Permitir pesquisa pela idade.

**Requisitos Não Funcionais (RNF):**
- **RNF1:** TypeScript para tipagem estática.
- **RNF2:** React Router para navegação de páginas.
- **RNF3:** Fetch API para chamadas de rede.
- **RNF4:** Deploy na Vercel.

---

## 🚀 O Que Entreguei (Features & Arquitetura)

Para garantir uma aplicação performática, escalável e com excelente UX, a arquitetura foi expandida para além dos requisitos básicos, focando em princípios de Clean Code e componentização reutilizável:

*   **Paginação e Filtros Client-Side Otimizados:** Como a Random User API não suporta filtros nativos consistentes para paginação e busca simultânea, implementamos uma arquitetura onde 200 usuários são cacheados no `UsersContext` na montagem. Toda paginação e filtragem ocorre na memória usando `useMemo`, eliminando requisições redundantes de rede e garantindo uma interface extremamente rápida.
*   **Filtro Específico e Omni-Search:** Resolução do bug comum de colisão de dados (ex: pesquisar pela idade "88" e retornar um ID alfanumérico que contenha "88"). O usuário possui um `select` para buscar globalmente ou isolar a pesquisa em uma coluna exata.
*   **State-Syncing na URL:** Os filtros de texto, a categoria de busca e a página atual são sincronizados em tempo real com a URL (`?searchBy=age&search=30&page=2`). Isso permite que os usuários compartilhem links que restauram o estado exato da aplicação.
*   **Internacionalização (i18n):** Suporte completo para Português (PT-BR) e Inglês (EN-US) utilizando `react-i18next`, com detecção automática do idioma do navegador.
*   **Light/Dark Mode Nativo:** Implementação fluida de troca de tema utilizando variáveis CSS e a nova arquitetura do **Tailwind CSS v4**, respeitando rigorosamente a paleta de cores do protótipo original.
*   **Data Sanitization (Segurança):** Cumprimento rígido do RF5 realizando a limpeza de todos os dados sensíveis de autenticação na camada de serviço (`services/api.ts`) antes mesmo do JSON chegar ao estado global da aplicação.

---

## 🛠️ Stack Tecnológica

- **React 18** (Vite)
- **TypeScript**
- **Tailwind CSS v4** (Estilização e Variáveis de Tema)
- **React Router DOM** (Roteamento e Search Params)
- **Context API** (Gerenciamento de Estado Global)
- **i18next** (Internacionalização)
- **Lucide React** (Ícones SVG)

---

## 🖼️ Figma 

- https://www.figma.com/design/d7tffwO8l1hXxjH8fxdaZH/Desafio-Frontend---Find-People?node-id=0-1&t=r7XD5aFDWtZd49Bj-0

## 🛜 Link para o projeto no ar

- https://folkdex-davikonuma.vercel.app/
