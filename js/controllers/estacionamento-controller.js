// CONTROLLER: liga eventos do usuário ao modelo e à apresentação.
(function () {
  let modelo;
  const formulario = document.querySelector("#form-reserva");

  function atualizar() {
    const reservas = modelo.listar();
    const vagas = modelo.listarVagas(reservas);
    EstacionamentoView.listarReservas(reservas);
    EstacionamentoView.listarVagas(vagas);
    EstacionamentoView.atualizarFormulario(vagas);
    const livres = vagas.filter(vaga => vaga.disponivel).length;
    EstacionamentoView.mensagem(`${reservas.length} reserva(s) cadastrada(s) · ${livres} vaga(s) disponível(is) de ${modelo.totalVagas}.`);
  }

  function atualizarComSeguranca() {
    try {
      atualizar();
    } catch (erro) {
      EstacionamentoView.bloquear();
      EstacionamentoView.mensagem(erro.message, true);
    }
  }

  try {
    modelo = new EstacionamentoModel(window.localStorage);
    atualizar();
  } catch (erro) {
    EstacionamentoView.bloquear();
    EstacionamentoView.mensagem(erro.message || "Não foi possível acessar o armazenamento do navegador.", true);
    return;
  }

  formulario?.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (!formulario.reportValidity()) return;
    let reserva;
    try {
      const dados = Object.fromEntries(new FormData(formulario));
      reserva = modelo.salvar(dados);
    } catch (erro) {
      atualizarComSeguranca();
      EstacionamentoView.mensagem(erro.message, true);
      window.alert(erro.message);
      return;
    }
    // Exigências do desafio: dados no console e pop-up de confirmação.
    console.log("Reserva cadastrada:", reserva);
    formulario.reset();
    atualizarComSeguranca();
    window.alert("Cadastro realizado com sucesso!");
    document.querySelector("#placa").focus();
  });

  document.querySelector("#lista-reservas")?.addEventListener("click", function (evento) {
    const botao = evento.target.closest("button[data-placa]");
    if (!botao) return;
    if (!window.confirm(`Remover a reserva da placa ${botao.dataset.placa} e liberar a vaga?`)) return;
    try {
      modelo.remover(botao.dataset.placa);
    } catch (erro) {
      atualizarComSeguranca();
      EstacionamentoView.mensagem(erro.message, true);
      window.alert(erro.message);
      return;
    }
    atualizarComSeguranca();
    document.querySelector("#lista-reservas button")?.focus();
    EstacionamentoView.mensagem("Reserva removida. A vaga está disponível novamente.");
  });

  // Mantém a apresentação atualizada ao voltar pelo navegador ou usar outra aba.
  window.addEventListener("pageshow", atualizarComSeguranca);
  window.addEventListener("storage", function (evento) {
    if (evento.key === modelo.chave || evento.key === null) atualizarComSeguranca();
  });
})();
