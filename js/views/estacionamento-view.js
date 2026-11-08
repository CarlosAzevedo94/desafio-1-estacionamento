// VIEW: cria os elementos e apresenta os dados, sem ler o localStorage.
const EstacionamentoView = {
  listarReservas(reservas) {
    const lista = document.querySelector("#lista-reservas");
    if (!lista) return;
    lista.replaceChildren();
    if (!reservas.length) {
      const linha = lista.insertRow();
      const celula = linha.insertCell();
      celula.colSpan = 8;
      celula.textContent = "Nenhuma reserva cadastrada. Clique em Nova reserva para começar.";
      return;
    }
    for (const reserva of reservas) {
      const linha = lista.insertRow();
      for (const campo of ["vaga", "placa", "proprietario", "apartamento", "bloco", "modelo", "cor"]) {
        // textContent apresenta o preenchimento como texto, sem executar HTML.
        linha.insertCell().textContent = reserva[campo];
      }
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "remover";
      botao.dataset.placa = reserva.placa;
      botao.textContent = "Remover";
      botao.setAttribute("aria-label", `Remover reserva da placa ${reserva.placa}, vaga ${reserva.vaga}`);
      linha.insertCell().append(botao);
    }
  },

  listarVagas(vagas) {
    const lista = document.querySelector("#lista-vagas");
    if (!lista) return;
    lista.replaceChildren();
    for (const vaga of vagas) {
      const item = document.createElement("li");
      item.className = vaga.disponivel ? "disponivel" : "ocupada";
      const titulo = document.createElement("strong");
      titulo.textContent = `Vaga ${String(vaga.numero).padStart(2, "0")}`;
      const situacao = document.createElement("span");
      situacao.textContent = vaga.disponivel ? "Disponível" : "Ocupada";
      item.append(titulo, situacao);
      lista.append(item);
    }
  },

  atualizarFormulario(vagas) {
    const select = document.querySelector("#vaga");
    if (!select) return;
    const selecionada = select.value;
    const livres = vagas.filter(vaga => vaga.disponivel);
    select.replaceChildren(new Option(livres.length ? "Selecione uma vaga" : "Nenhuma vaga disponível", ""));
    for (const vaga of livres) select.add(new Option(`Vaga ${vaga.numero}`, String(vaga.numero)));
    if (livres.some(vaga => String(vaga.numero) === selecionada)) select.value = selecionada;
    select.disabled = livres.length === 0;
    document.querySelector('button[type="submit"]').disabled = livres.length === 0;
  },

  mensagem(texto, erro = false) {
    const painel = document.querySelector("#mensagem");
    painel.textContent = texto;
    painel.className = erro ? "aviso erro" : "aviso";
  },

  bloquear() {
    const botao = document.querySelector('button[type="submit"]');
    if (botao) botao.disabled = true;
    document.querySelector("#lista-reservas")?.replaceChildren();
    document.querySelector("#lista-vagas")?.replaceChildren();
  }
};
