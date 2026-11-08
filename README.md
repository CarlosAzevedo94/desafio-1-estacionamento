# Controle de estacionamento — Desafio 1

Projeto acadêmico de Desenvolvimento Web com HTML, CSS e JavaScript, sem frameworks.

**Autor** Carlos Pereira Azevedo

## Funcionalidades

- Cadastro com os sete campos obrigatórios.
- Validação de preenchimento, placa e vaga de 1 a 20.
- Bloqueio de placa duplicada e de vaga já ocupada.
- Exibição dos dados no console e pop-up de sucesso após salvar.
- Listagem das reservas com remoção mediante confirmação.
- Consulta das 20 vagas com indicação textual de disponível ou ocupada.
- Seleção de vagas livres no formulário e bloqueio de cadastro quando lotado.
- Persistência em localStorage e atualização ao retornar à página ou usar outra aba.
- Mensagens de erro quando o armazenamento está indisponível ou inválido.

## Como executar

Use um servidor local para que as três páginas compartilhem a mesma origem e as mesmas reservas.
Abrir cada HTML por file:// não garante armazenamento compartilhado entre páginas nos navegadores.

Se tiver Node.js, abra um terminal nesta pasta e execute:

```sh
node servidor.js
```

Acesse http://127.0.0.1:5500 e mantenha o terminal aberto. Encerre com Ctrl+C.
O servidor usa somente módulos nativos do Node.js, sem instalação de pacotes, frameworks ou banco de dados.
Se a porta 5500 estiver ocupada, encerre a outra instância antes de iniciar.

Alternativa com Python instalado, na mesma pasta:

```sh
python -m http.server 5500 --bind 127.0.0.1
```

Use sempre o mesmo endereço, porta, navegador e perfil para encontrar suas reservas.
Os dados ficam neste navegador. Não são compartilhados com outros computadores e podem ser perdidos ao limpar os dados do site.
Por ser um protótipo local, não oferece coordenação de gravações simultâneas entre usuários.

## Organização MVC

| Arquivo | Responsabilidade |
| --- | --- |
| index.html | Estrutura da listagem |
| cadastro.html | Estrutura do formulário |
| vagas.html | Estrutura da consulta de vagas |
| assets/css/style.css | Aparência responsiva e estados visuais |
| js/models/estacionamento-model.js | Validar, salvar, listar, remover e persistir reservas |
| js/views/estacionamento-view.js | Apresentar dados e mensagens nos elementos HTML |
| js/controllers/estacionamento-controller.js | Tratar eventos e conectar modelo e apresentação |
| servidor.js | Servir arquivos localmente; não faz parte das regras da aplicação |

Os scripts são carregados com defer na ordem modelo, apresentação e controlador.
O conteúdo digitado é apresentado com textContent, sem ser interpretado como HTML.

## Regras adotadas

Condomínio fictício com 20 vagas. Todos os campos são obrigatórios.
Cada placa e cada vaga podem aparecer em apenas uma reserva.
Aceita placas no padrão antigo (ABC-1234 ou ABC1234) e Mercosul (ABC1D23).
As placas são gravadas em maiúsculas e sem hífen.
Remover uma reserva libera a vaga. Cancelar a confirmação mantém a reserva.

## Conferência no navegador

1. Inicie sem reservas: a listagem deve estar vazia e as 20 vagas disponíveis.
2. Cadastre ABC1D23, proprietário fictício, apartamento 101, bloco A, Onix, prata, vaga 1.
3. Confira o pop-up de sucesso e o objeto no Console das ferramentas de desenvolvedor.
4. Acesse Reservas: confira os sete dados. Atualize a página e confira a persistência.
5. Consulte Vagas disponíveis: a vaga 1 deve estar ocupada. No cadastro, não deve aparecer na seleção.
6. Tente cadastrar a mesma placa em outra vaga: deve aparecer um erro, mantendo a reserva original.
7. Tente enviar placa inválida ou campos vazios: não deve salvar.
8. Clique em Remover e cancele: a reserva deve permanecer. Confirme em seguida: a vaga deve ficar livre.
9. Reduza a janela para conferir a disposição em uma coluna no formulário e a rolagem da tabela.

Não inclua dados pessoais reais nos exemplos ou no repositório público.

## Testes realizados

Os testes manuais no navegador confirmaram o cadastro e a mensagem de sucesso, a listagem, a persistência após atualizar a página e a atualização das vagas. Também passaram o bloqueio de placa duplicada, a validação de campo vazio e placa inválida, o cancelamento da remoção e a liberação da vaga após confirmar a remoção.

Os testes isolados do modelo também verificaram os limites de vagas, a lotação e o tratamento de falhas de armazenamento. A sintaxe dos quatro arquivos JavaScript foi verificada.

## Apoio no desenvolvimento

Usei o ChatGPT (OpenAI) como apoio na implementação do sistema e na conferência final do código. Realizei os testes manuais no navegador para verificar o funcionamento da aplicação.
