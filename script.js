//Armazena o corpo do site para futuras alterações
var corpo = document.getElementsByTagName("body")[0];

//Armazena a janela de aviso para futuras alterações
var aviso = document.getElementById("aviso");

//Variável que armazena a peça do vencedor
var vencedor;

//Jogadores
//São vetores que guardam as informações de cada jogador, as informações são:
//[0] = Nome
//[1] = Peça
//[2] = Número de VItórias nessa sessão
//[3] = Número de Derrotas nessa sessão
//[4] = Número de empates nessa sessão
var jogadorUm = ["Jogador 1", "X", 0, 0, 0];
var jogadorDois = ["Jogador 2", "O", 0, 0, 0];

//Representa qual jogador está jogando naquele momento (1 para a vez do jogador 1 e -1 para a vez do jogador 2)
var turno = 1;

//Função que inicia o jogo
function Jogar() {
    //Limpa a tela
    corpo.removeChild(document.getElementById("main"));

    //Cria a mesa
    let mesa = document.createElement("div");
    mesa.setAttribute("class", "mesa");
    mesa.setAttribute("id", "main");

    //Cria o painel de informações do Jogador 1
    criarPainel(jogadorUm, mesa);

    //Cria o tabuleiro para o jogo
    let tabuleiro = document.createElement("div");
    tabuleiro.setAttribute("class", "tabuleiro");

    //Cria os espaços do tabuleiro
    for (let i = 0; i < 9; i++) {
        let casa = document.createElement("div");
        casa.setAttribute("id", i);
        casa.setAttribute("onclick", "jogada(event)");
        casa.setAttribute("class", "casa");

        tabuleiro.appendChild(casa);
    }

    //Coloca o 'tabuleiro' na 'mesa'
    mesa.appendChild(tabuleiro);

    //Cria o painel de informações do Jogador 2
    criarPainel(jogadorDois, mesa);

    //Cria e coloca o 'narrador' no corpo do site
    let narrador = document.createElement("h1"); 
    narrador.setAttribute("id", "narrador");
    corpo.appendChild(narrador);

    //Coloca a 'mesa' no corpo do site
    corpo.appendChild(mesa);

    trocarTurno();
}

function trocarTurno() {
    if (turno == 1) {
        document.getElementById("narrador").innerHTML = "~ Agora é a vez do " + jogadorUm[0] + " jogar ~";
        document.getElementsByClassName("painel")[0].style = "background-color: gold; border-color: gold; color: rgb(168, 14, 168)";
        document.getElementsByClassName("painel")[1].style = "border-color: white; color black";
    }
    else {
        document.getElementById("narrador").innerHTML = "~ Agora é a vez do " + jogadorDois[0] + " jogar ~";
        document.getElementsByClassName("painel")[0].style = "border-color: white; color black";
        document.getElementsByClassName("painel")[1].style = "background-color: gold; border-color: gold; color: rgb(168, 14, 168)";
    }
}

function prepararJogo() {
    //Obter os nomes dos jogadores
    let campoNomeUm = document.getElementById("nome1");
    let campoNomeDois = document.getElementById("nome2");

    //Impede o nome dos jogadores de serem um campo vazio
    if (campoNomeUm.value !== "") {
        jogadorUm[0] = campoNomeUm.value;
    }
    if (campoNomeDois.value !== "") {
        jogadorDois[0] = campoNomeDois.value;
    }

    //Define aleatóriamente quem será o primeiro a jogar
    let moeda = Math.random()
    if (moeda < 0.5) {
        turno  = 1;
    }
    else {
        turno = -1;
    }

    Jogar();
}

function criarPainel(jogador, mesa) {
    let painel = document.createElement("div");
    painel.setAttribute("class", "painel");

    let nome = document.createElement("h2");
    nome.innerHTML = jogador[0];

    let tipo = document.createElement("h3");
    tipo.innerHTML = jogador[1];
    tipo.style.fontSize = "xx-large";

    let contadorVitorias = document.createElement("h4");
    contadorVitorias.innerHTML = "Vitórias: " + jogador[2];

    let contadorDerrotas = document.createElement("h4");
    contadorDerrotas.innerHTML = "Derrotas: " + jogador[3];

    let contadorEmpates = document.createElement("h4");
    contadorEmpates.innerHTML = "Empates: " + jogador[4];

    painel.appendChild(nome);
    painel.appendChild(tipo);
    painel.appendChild(contadorVitorias);
    painel.appendChild(contadorDerrotas);
    painel.appendChild(contadorEmpates);

    mesa.appendChild(painel);
}

//Coloca a peça do jogador no tabuleiro
function jogada(e) {
    if (e.target.innerHTML == "") {
        if (turno == 1) {
            e.target.innerHTML = jogadorUm[1];
        }
        else {
            e.target.innerHTML = jogadorDois[1];
        }

        checarFinal();
    }
}

//Verifica se o jogo chegou ao fim
function checarFinal() {
    let casas = document.getElementsByClassName("casa");
    vencedor = "";

    //Verifica se foi completada uma linha na horizontal
    for (let i = 0; i < 7; i++) {
        if (casas[i].innerHTML == casas[i+1].innerHTML && casas[i+1].innerHTML == casas[i+2].innerHTML) {
            if (casas[i].innerHTML != "") {
                vencedor = casas[i].innerHTML;
                break;
            }
        }
        i += 2;
    }

    //Verifica caso um vencedor não foi definido nas linhas horizontais
    if (vencedor == "") {
        //Verifica se foi completada uma linha na vertical
        for (let i = 0; i < 3; i++) {
            if (casas[i].innerHTML == casas[i+3].innerHTML && casas[i+3].innerHTML == casas[i+6].innerHTML) {
                if (casas[i].innerHTML != "") {
                    vencedor = casas[i].innerHTML;
                    break;
                }
            }
        }
    }

    //Verifica caso um vencedor não foi definido nas linhas horizontais ou verticais
    if (vencedor == "") {
        //Verifica a diagonal decrescente
        if (casas[0].innerHTML == casas[4].innerHTML && casas[4].innerHTML == casas[8].innerHTML) {
            if (casas[4].innerHTML != "") {
                vencedor = casas[4].innerHTML;
            }
        }
        //Apenas faz a última verificação caso o vencedor ainda não tenha sido encontrado
        else {
            //Verifica a diagonal crescente
            if (casas[2].innerHTML == casas[4].innerHTML && casas[4].innerHTML == casas[6].innerHTML) {
                if (casas[4].innerHTML != "") {
                    vencedor = casas[4].innerHTML;
                }
            }
        }
    }

    //Finaliza o jogo se alguém vencer
    if (vencedor != "") {
        if (vencedor == "X") {
            jogadorUm[2] += 1;
            jogadorDois[3] += 1;
        }
        else {
            jogadorUm[3] += 1;
            jogadorDois[2] += 1;
        }
        chamarAviso();
    }
    else {
        //Verifica se houve um empate
        let empate = 1;
        for (let i = 0; i < casas.length; i++) {
            if (casas[i].innerHTML == "") {
                empate = 0;
            }
        }

        if (empate) {
            jogadorUm[4] += 1;
            jogadorDois[4] += 1;
            chamarAviso();
        }

        //Passa para o próximo turno se ninguém ganhar
        else {
            turno = turno*-1;
            trocarTurno();
        }
    }
}

//Função para exibir a janela de aviso
function chamarAviso() {
    if (vencedor == "X") {
        document.getElementById("aviso-mensagem").innerHTML = jogadorUm[0] + " venceu!";
    }
    else if (vencedor == "O") {
        document.getElementById("aviso-mensagem").innerHTML = jogadorDois[0] + " venceu!";
    }
    else {    
        document.getElementById("aviso-mensagem").innerHTML = "Deu velha!";
    }

    aviso.style.display = "block";
}

//Função para fechar a janela de aviso
function fecharAviso() {
    aviso.style.display = "none";
    corpo.removeChild(document.getElementById("narrador"));
    Jogar();
}