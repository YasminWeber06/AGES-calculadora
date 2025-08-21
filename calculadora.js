document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");

    function printarInput(valor) {
        if (valor === ".") {
            // impede mais de uma vírgula no mesmo número
            let partes = display.value.split(/[\+\-\*\/]/);
            let ultimoNumero = partes[partes.length - 1];
            if (ultimoNumero.includes(".")) {
                return;
            }
        }

        if (["+", "-", "*", "/"].includes(valor)) {
            // impede dois operadores seguidos
            let ultimoChar = display.value.slice(-1);
            if (["+", "-", "*", "/"].includes(ultimoChar)) {
                return;
            }
        }

        if (display.value === "0" && valor !== "." && !["+", "-", "*", "/"].includes(valor)) {
            display.value = valor;
        } else {
            display.value += valor;
        }
    }

    function apagarUltimo() {
        let valorAtual = display.value;
        if (valorAtual.length <= 1 || valorAtual === "0") {
            display.value = "0";
        } else {
            display.value = valorAtual.slice(0, -1);
        }
    }

    function limparTudo() {
        display.value = "0";
    }

    function porcentagem() {
        let expressao = display.value.replace(",", ".");
        let regex = /(-?\d+\.?\d*)\s*([+\-*/])\s*(-?\d+\.?\d*)$/;
        let match = expressao.match(regex);

        if (match) {
            let numeroBase = parseFloat(match[1]);
            let operador = match[2];
            let numeroParaPorcentagem = parseFloat(match[3]);

            let resultado = 0;
            switch (operador) {
                case "+":
                case "-":
                    resultado = (numeroBase * numeroParaPorcentagem) / 100;
                    break;
                case "*":
                    resultado = numeroBase * (numeroParaPorcentagem / 100);
                    break;
                case "/":
                    resultado = numeroBase / (numeroParaPorcentagem / 100);
                    break;
            }

            display.value = numeroBase + operador + resultado;
        } else {
            let numero = parseFloat(expressao);
            if (!isNaN(numero)) {
                display.value = numero / 100;
            }
        }
    }

    function calcular() {
        try {
            let expressao = display.value.replace(/,/g, ".");
            let resultado = eval(expressao);
            if (!isNaN(resultado)) {
                display.value = resultado.toString().replace(".", ",");
            }
        } catch {
            display.value = "Erro";
        }
    }

    document.querySelectorAll(".numero").forEach(botao => {
        botao.addEventListener("click", () => {
            printarInput(botao.textContent);
        });
    });

    document.querySelectorAll(".operador").forEach(botao => {
        botao.addEventListener("click", () => {
            printarInput(botao.textContent);
        });
    });

    document.querySelectorAll(".comando").forEach(botao => {
        botao.addEventListener("click", () => {
            const valor = botao.textContent;

            if (valor === "CE") {
                limparTudo();
            } else if (valor === "C") {
                apagarUltimo();
            } else if (valor === "%") {
                porcentagem();
            } else if (valor === "=") {
                calcular();
            } else if (valor === ",") {
                printarInput(".");
            }
        });
    });
});
