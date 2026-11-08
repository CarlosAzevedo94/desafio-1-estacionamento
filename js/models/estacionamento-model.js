// MODEL: dados, persistência e regras, sem acesso aos elementos HTML.
class EstacionamentoModel {
  constructor(armazenamento) {
    this.armazenamento = armazenamento;
    this.chave = "desafio1.estacionamento.reservas.v1";
    this.totalVagas = 20;
  }

  validar(dados) {
    const nomes = {
      placa: "Placa", proprietario: "Proprietário", apartamento: "Apartamento",
      bloco: "Bloco", modelo: "Modelo", cor: "Cor", vaga: "Vaga"
    };
    const reserva = {};
    for (const [campo, nome] of Object.entries(nomes)) {
      const valor = dados?.[campo];
      if (!["string", "number"].includes(typeof valor) || !String(valor).trim()) {
        throw new Error(`Preencha o campo ${nome}.`);
      }
      reserva[campo] = String(valor).trim();
    }
    reserva.placa = reserva.placa.toUpperCase();
    if (!/^[A-Z]{3}-?(?:\d{4}|\d[A-Z]\d{2})$/.test(reserva.placa)) {
      throw new Error("Informe uma placa válida, como ABC-1234 ou ABC1D23.");
    }
    reserva.placa = reserva.placa.replace("-", "");
    reserva.vaga = Number(reserva.vaga);
    if (!Number.isInteger(reserva.vaga) || reserva.vaga < 1 || reserva.vaga > this.totalVagas) {
      throw new Error("Escolha uma vaga de 1 a 20.");
    }
    return reserva;
  }

  listar() {
    let texto;
    try {
      texto = this.armazenamento.getItem(this.chave);
    } catch {
      throw new Error("Não foi possível acessar as reservas. Permita o armazenamento do navegador.");
    }
    if (texto === null) return [];
    try {
      const dados = JSON.parse(texto);
      if (!Array.isArray(dados)) throw new Error();
      const reservas = dados.map(dado => this.validar(dado));
      const placas = new Set(reservas.map(reserva => reserva.placa));
      const vagas = new Set(reservas.map(reserva => reserva.vaga));
      if (placas.size !== reservas.length || vagas.size !== reservas.length) throw new Error();
      return reservas.sort((a, b) => a.vaga - b.vaga);
    } catch {
      throw new Error("Os dados armazenados estão inválidos. Nenhuma reserva foi alterada. Verifique o armazenamento antes de continuar.");
    }
  }

  gravar(reservas) {
    try {
      this.armazenamento.setItem(this.chave, JSON.stringify(reservas));
    } catch {
      throw new Error("Não foi possível salvar a alteração. Verifique a permissão e o espaço do armazenamento do navegador.");
    }
  }

  salvar(dados) {
    const reserva = this.validar(dados);
    // Relê os dados antes da alteração, inclusive ao trabalhar com duas abas.
    const reservas = this.listar();
    if (reservas.some(item => item.placa === reserva.placa)) {
      throw new Error("Esta placa já possui uma reserva cadastrada.");
    }
    if (reservas.some(item => item.vaga === reserva.vaga)) {
      throw new Error("Esta vaga já está ocupada. Escolha outra vaga.");
    }
    this.gravar([...reservas, reserva]);
    return reserva;
  }

  remover(placa) {
    const reservas = this.listar();
    const restantes = reservas.filter(reserva => reserva.placa !== placa);
    if (restantes.length === reservas.length) throw new Error("Esta reserva já foi removida. Atualize a listagem.");
    this.gravar(restantes);
  }

  listarVagas(reservas = this.listar()) {
    return Array.from({ length: this.totalVagas }, (_, indice) => ({
      numero: indice + 1,
      disponivel: !reservas.some(reserva => reserva.vaga === indice + 1)
    }));
  }
}
