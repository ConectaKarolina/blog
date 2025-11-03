window.valorSelecionado = null;
window.simuladorUsado = false;
window.modoAtual = "credito";
window.categoriaAtual = "casa";

const valores = {
  casa: {
    credito: { min: 80000, max: 500000, step: 1000 },
    parcela: { min: 533, max: 6000, step: 50 }
  },
  carro: {
    credito: { min: 35000, max: 200000, step: 1000 },
    parcela: { min: 328, max: 5000, step: 50 }
  },
  moto: {
    credito: { min: 12000, max: 30000, step: 500 },
    parcela: { min: 244, max: 1494.74, step: 10 }
  },
  servico: {
    credito: { min: 12000, max: 20000, step: 500 },
    parcela: { min: 410, max: 1044.66, step: 10 }
  }
};

const range = document.getElementById("rangeSimulador");
const valorExibido = document.getElementById("valorExibido");
const valorMin = document.getElementById("valorMin");
const valorMax = document.getElementById("valorMax");
const labelModo = document.getElementById("labelModo");

function formatarValor(v) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function atualizarSimulador() {
  const conf = valores[window.categoriaAtual][window.modoAtual];

  range.min = conf.min;
  range.max = conf.max;
  range.step = conf.step || 1;
  range.value = conf.min;

  valorMin.textContent = formatarValor(conf.min);
  valorMax.textContent = formatarValor(conf.max);
  valorExibido.textContent = formatarValor(conf.min);

  window.valorSelecionado = formatarValor(conf.min);

  if (window.modoAtual === "credito") {
    labelModo.textContent = "crédito";
    document.getElementById("artigo").textContent = "do";
  } else {
    labelModo.textContent = "parcela";
    document.getElementById("artigo").textContent = "da";
  }
}

range.addEventListener("input", () => {
  const valor = parseFloat(range.value);
  window.valorSelecionado = formatarValor(valor);
  valorExibido.textContent = window.valorSelecionado;
  window.simuladorUsado = true;
});

document.querySelectorAll(".categoria-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".categoria-btn").forEach(b => {
      b.classList.remove("border-cyan-400", "shadow-lg", "scale-105");
      b.classList.add("border-gray-200");
    });

    btn.classList.remove("border-gray-200");
    btn.classList.add("border-cyan-400", "shadow-lg", "scale-105");

    window.categoriaAtual = btn.dataset.cat;
    atualizarSimulador();
  });
});

document.querySelectorAll(".modo-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".modo-btn").forEach(b => {
      b.classList.remove("border-cyan-400", "shadow-lg", "scale-105");
      b.classList.add("border-gray-200");
    });

    btn.classList.remove("border-gray-200");
    btn.classList.add("border-cyan-400", "shadow-lg", "scale-105");

    window.modoAtual = btn.dataset.modo;
    atualizarSimulador();
  });
});

function scrollToForm() {
  const whatsappNumber = "5577981139895";
  let mensagem = "Olá! Gostaria de simular um consórcio";
  
  if (window.simuladorUsado && window.valorSelecionado) {
    mensagem += ` de ${window.categoriaAtual} no valor de ${window.valorSelecionado}`;
  }
  
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}

function inicializar() {
  atualizarSimulador();

  const btnCasa = document.querySelector(`.categoria-btn[data-cat="casa"]`);
  if (btnCasa) {
    btnCasa.classList.remove("border-gray-200");
    btnCasa.classList.add("border-cyan-400", "shadow-lg", "scale-105");
  }

  const btnCredito = document.querySelector('.modo-btn[data-modo="credito"]');
  if (btnCredito) {
    btnCredito.classList.add("border-cyan-400", "shadow-lg", "scale-105");
    btnCredito.classList.remove("border-gray-200");
  }
}

inicializar();