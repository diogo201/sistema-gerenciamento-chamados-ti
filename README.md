# Sistema de Chamados de TI

## Trabalho Acadêmico

**Disciplina:** Desenvolvimento Orientado a Reuso de Software

**Modalidade:** Trabalho em dupla

**Integrantes:**
- Diogo Gabriel Enumo
- Rafael Benvenutti Gonçalves

---

## 1. Apresentação do Projeto

O Sistema de Chamados de TI é uma aplicação web
desenvolvida para gerenciar solicitações de suporte
técnico em um ambiente organizacional.

A aplicação permite registrar, consultar, editar,
atualizar o status e excluir chamados de TI.

O projeto foi desenvolvido como atividade acadêmica
da disciplina Desenvolvimento Orientado a Reuso
de Software, utilizando uma arquitetura baseada
em microsserviços.

A solução integra um microsserviço original,
um API Gateway, um servidor de descoberta de
serviços (Eureka Server) e uma interface web.

---

## 2. Objetivo

O objetivo do projeto é aplicar conceitos de
desenvolvimento orientado a reuso de software,
utilizando tecnologias que possibilitam a
separação de responsabilidades e a comunicação
entre diferentes componentes.

Os principais objetivos são:

- Desenvolver um microsserviço original.
- Implementar operações CRUD.
- Utilizar um API Gateway.
- Implementar descoberta de serviços com Eureka.
- Criar uma interface web para o usuário.
- Desenvolver testes automatizados.
- Verificar a cobertura dos testes com JaCoCo.

---

## 3. Tecnologias Utilizadas

### Backend

- Java 21
- Spring Boot 3.5.8
- Spring Cloud 2025.0.1
- Spring Web
- Spring Data JPA
- Spring Cloud Gateway
- Netflix Eureka Server
- H2 Database
- Maven

### Frontend

- HTML5
- CSS3
- JavaScript
- Fetch API

### Testes Automatizados

- JUnit
- Mockito
- JaCoCo

### Ferramentas de Desenvolvimento

- Visual Studio Code
- Live Server
- Navegador web
- Terminal do Windows

---

## 4. Arquitetura do Sistema

O sistema foi organizado em quatro módulos.

### 4.1 Eureka Server

O Eureka Server é responsável pelo registro
e descoberta dos serviços disponíveis.

Ele permite que o API Gateway localize
o microsserviço por meio do nome registrado
no serviço de descoberta.

**Porta:** 8761

**Endereço:**
http://localhost:8761

### 4.2 API Gateway

O API Gateway funciona como ponto central
de entrada das requisições.

Ele recebe as solicitações do frontend
e encaminha para o microsserviço de chamados
por meio da descoberta de serviços.

**Porta:** 8080

**Endpoint principal:**
http://localhost:8080/chamados

### 4.3 Chamados Service

O chamados-service é o microsserviço original
desenvolvido para o projeto.

Ele implementa as operações de cadastro,
consulta, atualização e exclusão de chamados.

Também utiliza Spring Data JPA e banco H2
para gerenciar os registros.

**Porta:** 8081

### 4.4 Chamados Frontend

O frontend é a interface utilizada
para interagir com o sistema.

Foi desenvolvido com HTML, CSS e JavaScript.

A comunicação com o backend ocorre por
requisições HTTP realizadas com Fetch API,
utilizando o API Gateway.

---

## 5. Fluxo de Comunicação

O fluxo de requisições do sistema é:

Frontend
    |
    v
API Gateway (8080)
    |
    v
Chamados Service (8081)
    |
    v
Banco de Dados H2

O Eureka Server (8761) participa da
descoberta dos serviços.

O chamados-service se registra no Eureka,
e o API Gateway utiliza esse registro
para localizar o microsserviço.

Após a descoberta, as requisições são
encaminhadas pelo API Gateway ao
chamados-service.

---

## 6. Estrutura do Projeto

Trabalho de Desenvolvimento Orientado a Reuso de Software/
|
|-- eureka-server/
|
|-- api-gateway/
|
|-- chamados-service/
|
|-- chamados-frontend/
|   |-- index.html
|   |-- style.css
|   |-- script.js
|
|-- README.md

---

## 7. Funcionalidades do Sistema

### Cadastro de Chamados

Permite registrar novos chamados informando:

- Título
- Descrição
- Prioridade

Todo chamado é inicialmente cadastrado
com o status "Aberto".

### Consulta de Chamados

Permite visualizar os chamados cadastrados,
incluindo suas informações e identificadores.

### Edição de Chamados

Permite modificar:

- Título
- Descrição
- Prioridade
- Status

### Alteração de Status

Os chamados podem apresentar os seguintes status:

- Aberto
- Em andamento
- Concluído

### Exclusão de Chamados

Permite excluir chamados cadastrados,
mediante confirmação do usuário.

### Pesquisa e Filtros

A interface permite:

- Pesquisar chamados pelo título.
- Filtrar chamados por prioridade.
- Filtrar chamados por status.
- Combinar os filtros.
- Limpar os filtros aplicados.

### Painel de Indicadores

O painel apresenta:

- Total de chamados.
- Quantidade de chamados abertos.
- Quantidade de chamados em andamento.
- Quantidade de chamados concluídos.

---

## 8. Endpoints da API

A API REST disponibiliza os seguintes endpoints:

| Método | Endpoint | Funcionalidade |
|--------|----------|----------------|
| GET | /chamados | Listar chamados |
| GET | /chamados/{id} | Consultar chamado |
| POST | /chamados | Cadastrar chamado |
| PUT | /chamados/{id} | Atualizar chamado |
| DELETE | /chamados/{id} | Excluir chamado |

### Exemplo de Cadastro

Requisição:

POST http://localhost:8080/chamados

Corpo JSON:

```json
{
  "titulo": "Computador sem internet",
  "descricao": "O computador não conecta à rede.",
  "prioridade": "Alta",
  "status": "Aberto"
}
```

---

## 9. Como Executar o Projeto

### Pré-requisitos

Para executar a aplicação, é necessário:

- Java 21 instalado.
- Maven instalado ou Maven Wrapper disponível.
- Navegador web.
- Visual Studio Code.
- Extensão Live Server.

### Passo 1 - Iniciar o Eureka Server

Abra um terminal na pasta:

eureka-server

Execute:

```powershell
.\mvnw.cmd spring-boot:run
```

Acesse:

http://localhost:8761

### Passo 2 - Iniciar o Chamados Service

Abra outro terminal na pasta:

chamados-service

Execute:

```powershell
.\mvnw.cmd spring-boot:run
```

O serviço será iniciado na porta 8081.

### Passo 3 - Iniciar o API Gateway

Abra outro terminal na pasta:

api-gateway

Execute:

```powershell
.\mvnw.cmd spring-boot:run
```

O gateway será iniciado na porta 8080.

### Passo 4 - Iniciar o Frontend

No Visual Studio Code:

1. Abra a pasta chamados-frontend.
2. Localize o arquivo index.html.
3. Clique com o botão direito.
4. Selecione "Open with Live Server".
5. Aguarde a abertura da página no navegador.

### Importante

Os três serviços backend precisam permanecer
executando para que o frontend consiga
realizar as operações.

Caso algum módulo não possua o Maven Wrapper,
utilize o comando abaixo, desde que o Maven
esteja instalado:

```powershell
mvn spring-boot:run
```

---

## 10. Testes Automatizados

O projeto utiliza testes automatizados
para verificar o funcionamento do microsserviço.

As tecnologias utilizadas são:

- JUnit
- Mockito
- JaCoCo

Os testes incluem a verificação do
comportamento do controlador de chamados.

### Como Executar os Testes

Abra um terminal na pasta:

chamados-service

Execute:

```powershell
.\mvnw.cmd clean verify
```

Esse comando executa os testes e gera
o relatório de cobertura.

### Relatório JaCoCo

O relatório HTML é gerado em:

chamados-service/target/site/jacoco/index.html

### Resultado Obtido

Na última execução verificada:

- Compilação: BUILD SUCCESS
- Testes executados: 2
- Cobertura de instruções: 30%
- Cobertura de linhas: aproximadamente 46%

Os resultados demonstram que o projeto
superou o requisito mínimo de 10%
de cobertura de testes.

---

## 11. Banco de Dados

O sistema utiliza o banco de dados H2
em memória, integrado ao Spring Boot
por meio do Spring Data JPA.

Essa solução facilita a execução
e os testes do projeto acadêmico.

Como os dados são armazenados em memória,
os chamados podem ser perdidos quando
o microsserviço é reiniciado.

---

## 12. Relação com os Critérios da Atividade

### Critério 1 - Microsserviço Original

Foi desenvolvido o chamados-service,
responsável pelo gerenciamento de chamados
de suporte técnico.

### Critério 2 - API Gateway e Eureka

O projeto utiliza Spring Cloud Gateway
para centralizar as requisições e
Netflix Eureka para descoberta de serviços.

### Critério 3 - Testes Automatizados

Foram implementados testes automatizados
com JUnit e Mockito.

A cobertura é medida pelo JaCoCo
e supera o mínimo de 10% exigido.

---

## 13. Desenvolvimento em Dupla

O projeto Sistema de Chamados de TI foi
desenvolvido em dupla para a disciplina
Desenvolvimento Orientado a Reuso de Software.

**Integrantes:**

- Diogo Gabriel Enumo
- Rafael Benvenutti Gonçalves

O desenvolvimento envolveu a implementação
dos módulos backend e frontend, a integração
dos serviços, a realização de testes
automatizados e a documentação da solução.

---

## 14. Considerações Finais

O desenvolvimento do Sistema de Chamados
de TI permitiu aplicar conceitos de
arquitetura de microsserviços, APIs REST,
descoberta de serviços e desenvolvimento
orientado a reuso.

A aplicação apresenta uma interface web
integrada a um microsserviço original,
com operações CRUD e funcionalidades
de pesquisa e gerenciamento de chamados.

A utilização de testes automatizados
e da ferramenta JaCoCo também permitiu
avaliar parte da qualidade do código
desenvolvido.

O projeto atende aos critérios técnicos
propostos para a atividade acadêmica.
