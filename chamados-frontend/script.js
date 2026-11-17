
const API_URL = "http://localhost:8080/chamados";

const form = document.getElementById("formChamado");
const lista = document.getElementById("listaChamados");

const formEdicao = document.getElementById("formEdicao");
const secaoEdicao = document.getElementById("secaoEdicao");

const filtroTitulo = document.getElementById("filtroTitulo");
const filtroPrioridade = document.getElementById("filtroPrioridade");
const filtroStatus = document.getElementById("filtroStatus");

let chamadosCarregados = [];

// NORMALIZAR TEXTOS
function normalizar(texto) {
    return String(texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

// ATUALIZAR INDICADORES
function atualizarIndicadores(chamados) {
    const abertos = chamados.filter(
        c => normalizar(c.status) === "aberto"
    ).length;

    const andamento = chamados.filter(
        c => normalizar(c.status) === "em andamento"
    ).length;

    const concluidos = chamados.filter(
        c => normalizar(c.status) === "concluido"
    ).length;

    document.getElementById("totalChamados").textContent =
        chamados.length;

    document.getElementById("totalAbertos").textContent =
        abertos;

    document.getElementById("totalAndamento").textContent =
        andamento;

    document.getElementById("totalConcluidos").textContent =
        concluidos;
}

// APLICAR FILTROS
function aplicarFiltros() {
    const titulo = normalizar(filtroTitulo.value);
    const prioridade = normalizar(filtroPrioridade.value);
    const status = normalizar(filtroStatus.value);

    const filtrados = chamadosCarregados.filter(chamado => {
        const correspondeTitulo =
            normalizar(chamado.titulo).includes(titulo);

        const correspondePrioridade =
            !prioridade ||
            normalizar(chamado.prioridade) === prioridade;

        const correspondeStatus =
            !status ||
            normalizar(chamado.status) === status;

        return correspondeTitulo &&
            correspondePrioridade &&
            correspondeStatus;
    });

    exibirChamados(filtrados);
}

// EXIBIR CHAMADOS
function exibirChamados(chamados) {
    lista.innerHTML = "";

    if (chamados.length === 0) {
        lista.textContent =
            "Nenhum chamado encontrado.";
        return;
    }

    chamados.forEach(chamado => {
        const card = document.createElement("div");
        card.className = "chamado-card";

        const titulo = document.createElement("h3");
        titulo.textContent =
            `#${chamado.id} - ${chamado.titulo}`;

        const descricao = document.createElement("p");
        descricao.textContent = chamado.descricao;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            `Prioridade: ${chamado.prioridade}`;

        const situacao = document.createElement("p");
        situacao.textContent =
            `Status: ${chamado.status}`;

        const acoes = document.createElement("div");
        acoes.className = "acoes-chamado";

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";
        botaoEditar.onclick = () => editarChamado(chamado);

        const botaoStatus = document.createElement("button");
        botaoStatus.textContent = "Alterar Status";
        botaoStatus.onclick = () => alterarStatus(chamado);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "botao-excluir";
        botaoExcluir.onclick = () => excluirChamado(chamado.id);

        acoes.append(
            botaoEditar,
            botaoStatus,
            botaoExcluir
        );

        card.append(
            titulo,
            descricao,
            prioridade,
            situacao,
            acoes
        );

        lista.appendChild(card);
    });
}

// CARREGAR CHAMADOS DA API
async function carregarChamados() {
    try {
        const resposta = await fetch(API_URL);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar chamados");
        }

        chamadosCarregados = await resposta.json();

        atualizarIndicadores(chamadosCarregados);
        aplicarFiltros();

    } catch (erro) {
        console.error(erro);
        lista.textContent =
            "Não foi possível carregar os chamados.";
    }
}

// CADASTRAR CHAMADO
form.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const chamado = {
        titulo: document.getElementById("titulo").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        prioridade: document.getElementById("prioridade").value,
        status: "Aberto"
    };

    if (!chamado.titulo || !chamado.descricao) {
        alert("Preencha o título e a descrição.");
        return;
    }

    try {
        const resposta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(chamado)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar chamado");
        }

        alert("Chamado cadastrado com sucesso!");

        form.reset();
        await carregarChamados();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível cadastrar o chamado.");
    }
});

// ABRIR FORMULÁRIO DE EDIÇÃO
function editarChamado(chamado) {
    document.getElementById("editarId").value =
        chamado.id;

    document.getElementById("editarTitulo").value =
        chamado.titulo;

    document.getElementById("editarDescricao").value =
        chamado.descricao;

    const prioridade = normalizar(chamado.prioridade);

    document.getElementById("editarPrioridade").value =
        prioridade === "media"
            ? "Media"
            : prioridade === "alta"
                ? "Alta"
                : "Baixa";

    const status = normalizar(chamado.status);

    document.getElementById("editarStatus").value =
        status === "concluido"
            ? "Concluído"
            : status === "em andamento"
                ? "Em andamento"
                : "Aberto";

    secaoEdicao.hidden = false;

    secaoEdicao.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

// SALVAR EDIÇÃO
formEdicao.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const id = document.getElementById("editarId").value;

    const atualizado = {
        titulo: document.getElementById("editarTitulo").value.trim(),
        descricao: document.getElementById("editarDescricao").value.trim(),
        prioridade: document.getElementById("editarPrioridade").value,
        status: document.getElementById("editarStatus").value
    };

    if (!atualizado.titulo || !atualizado.descricao) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(atualizado)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar chamado");
        }

        alert("Chamado atualizado com sucesso!");

        secaoEdicao.hidden = true;
        formEdicao.reset();

        await carregarChamados();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível atualizar o chamado.");
    }
});

// CANCELAR EDIÇÃO
document.getElementById("cancelarEdicao")
    .addEventListener("click", function() {
        secaoEdicao.hidden = true;
        formEdicao.reset();
    });

// ALTERAR STATUS
async function alterarStatus(chamado) {
    const opcoes = {
        "aberto": "Em andamento",
        "em andamento": "Concluído",
        "concluido": "Aberto"
    };

    const statusAtual = normalizar(chamado.status);
    const novoStatus = opcoes[statusAtual] || "Aberto";

    const confirmado = confirm(
        `Alterar o status do chamado #${chamado.id} para "${novoStatus}"?`
    );

    if (!confirmado) return;

    try {
        const resposta = await fetch(
            `${API_URL}/${chamado.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    titulo: chamado.titulo,
                    descricao: chamado.descricao,
                    prioridade: chamado.prioridade,
                    status: novoStatus
                })
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao alterar status");
        }

        await carregarChamados();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível alterar o status.");
    }
}

// EXCLUIR CHAMADO
async function excluirChamado(id) {
    const confirmado = confirm(
        `Deseja realmente excluir o chamado #${id}?`
    );

    if (!confirmado) return;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao excluir chamado");
        }

        if (
            document.getElementById("editarId").value === String(id)
        ) {
            secaoEdicao.hidden = true;
            formEdicao.reset();
        }

        alert("Chamado excluído com sucesso!");
        await carregarChamados();

    } catch (erro) {
        console.error(erro);
        alert("Não foi possível excluir o chamado.");
    }
}

// EVENTOS DOS FILTROS
filtroTitulo.addEventListener("input", aplicarFiltros);
filtroPrioridade.addEventListener("change", aplicarFiltros);
filtroStatus.addEventListener("change", aplicarFiltros);

// LIMPAR FILTROS
document.getElementById("limparFiltros")
    .addEventListener("click", function() {
        filtroTitulo.value = "";
        filtroPrioridade.value = "";
        filtroStatus.value = "";

        aplicarFiltros();
    });

// CARREGAR CHAMADOS AO ABRIR A PÁGINA
carregarChamados();
