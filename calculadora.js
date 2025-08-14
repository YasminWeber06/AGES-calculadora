
let display = document.getElementById("display");


function inserir(valor) {
    display.value += valor;
}


function limparEntrada() {
    display.value = display.value.slice(0, -1);
}

function limparTudo() {
    display.value = "";
}

function porcentagem() {
    if (display.value !== "") {
        display.value = (parseFloat(display.value) / 100).toString();
    }
}


function calcular() {
    try {
        
        let expressao = display.value.replace(",", ".");
     
        let resultado = eval(expressao);
        display.value = resultado;
    } catch (erro) {
        display.value = "Erro";
    }
}

function inserirVirgula() {
    if (!display.value.includes(",")) {
        display.value += ",";
    }
}

document.querySelectorAll(".numero").forEach(botao => {
    botao.addEventListener("click", () => inserir(botao.textContent));
});
