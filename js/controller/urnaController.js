import Candidato from "../model/canditato.js"

export default class Teclado {

    constructor() {

        this.teclado = document.querySelectorAll('.botao-numerico')
        this.tecladoDeAcao = document.querySelectorAll('.botao-acao')
        this.primeiroNumero = document.querySelector('.primeiro-numero')
        this.segundoNumero = document.querySelector('.segundo-numero')
        this.telaEL = document.querySelector('.tela')
        this.visorEL = document.querySelector('.visor')
        this.visorCandidatoEL = document.querySelector('.visorCandidato')
        this.telaConfirmacao = document.querySelector('.visor-confirmacao')
        this.botaoBrancoEL = document.querySelector('.botao-branco')
        this.candidatoVotadoEL = document.querySelector('.nome-candidato')
        this.visorConfirmacaoCandidato = document.querySelector('.visor-confirmacao-candidato')

        this.candidatos = [
            new Candidato('Darth Vader', 'SITH', 99, '../../img/darthVader.png'),
            new Candidato('Obi Wan Kenobi', 'JEDI', 50, '../../img/obiWan.png'),
            new Candidato('Leia Organa', 'RESISTENCIA', 30, '../../img/leiaOrgana-removebg-preview.png')
        ]

        this.observadorTecladoNumerico()
        this.observadorTecladoAcao()
        this.criarCandidatos()

    }

    observadorTecladoNumerico() {

        let botaoValor = null

        this.teclado.forEach(botao => {

            botao.addEventListener('click', e => {

                botaoValor = e.target.innerText

                this.iniciarProcesso(Number(botaoValor))

            })

        });
    }

    observadorTecladoAcao() {

        let acao = null

        this.tecladoDeAcao.forEach(botao => {

            botao.addEventListener('click', e => {

                acao = e.target.innerText

                this.iniciarProcesso(acao)
            })

        });

    }

    iniciarProcesso(parametro) {

        let input = this.primeiroNumero
        let segundoInput = this.segundoNumero
        let parametroNumerico = typeof (parametro)
        let voto = null

        console.log(parametroNumerico)

        if (typeof (parametro) == "number") {
            console.log(input)
            if (input.innerText == "") {
                input.innerHTML = parametro
            } else {
                segundoInput.innerHTML = parametro
                voto = Object.assign({}, [input.innerText, segundoInput.innerText])
                this.renderizarCandidato(voto)
            }
        } else {
            if (parametro === 'BRANCO') {
                let confirmacao = confirm("Deseja confirmar seu voto em BRANCO?")
                if (confirmacao) {
                    this.visorEL.style.display = 'none'
                    this.telaConfirmacao.style.display = 'block'
                    setTimeout(() => {
                        this.telaConfirmacao.style.display = 'none'
                        this.visorEL.style.display = 'flex'
                    }, 3000);
                }
            }
            if (parametro === 'CORRIGE') {
                this.visorCandidatoEL.style.display = 'none'
                this.visorEL.style.display = 'flex'
                this.botaoBrancoEL.style.display = 'flex'

                this.limparVoto()
            }
            if (parametro === 'CONFIRMA') {
                this.visorConfirmacaoCandidato.innerHTML = `
                <div>
                    <h1>
                        Obrigado por votar, seu voto para Presidente da Galáxia foi computado.
                    </h1>
                </div>
                `
                this.visorCandidatoEL.style.display = 'none'
                this.visorConfirmacaoCandidato.style.display = 'flex'
            
                setTimeout(() => {
                    this.visorConfirmacaoCandidato.style.display = 'none'
                    this.visorEL.style.display = 'flex'
                    this.botaoBrancoEL.style.display = 'flex'
                }, 3000);

                this.limparVoto()
            }
        }






    }

    renderizarCandidato(parametro) {

        let voto = ""

        for (const key in parametro) {
            voto += parametro[key]
        }

        switch (voto.length) {
            case 2:

                let candidatoEncontrado = null

                this.buscarCandidatos().map(candidato => {
                    for (const key in candidato) {
                        (voto == candidato.numero) ? candidatoEncontrado = candidato: false
                    }
                })

                console.log(candidatoEncontrado)



                this.visorCandidatoEL.innerHTML =
                    `<div class="info-candidato">
                <div class="titulo-info">
                    <h1>
                        INFORMAÇÕES DO VOTO:
                    </h1>
                </div>
                <div class="titulo-candidato">
                    <h1>
                       PRESIDENTE DA GALÁXIA
                    </h1>
                </div>
                <div class = "foto-candidato">
                    <img class="img-candidato" src= ${candidatoEncontrado.img} alt = "teste" img>
                </div>
                <div class="numero-candidato">
                    <h2>
                        Número:
                    </h2>
                    <span class="input-do-numero">
                        ${voto[0]}
                    </span>
                    <span class="input-do-numero">
                        ${voto[1]}
                    </span>
                </div>
                <div class="nome-do-candidato">
                    <h2>
                        Nome: 
                    </h2>
                    <span class="nome-candidato">
                        ${candidatoEncontrado.nome}
                    </span>
                </div>
                <div class="partido-do-candidato">
                    <h2>
                        Partido:
                    </h2>
                    <span class="partido-candidato">
                        ${candidatoEncontrado.legenda}
                    </span>
                </div>
                <hr>
                <div class="orientacoes">
                    <h2>
                        Aperte a tecla:
                    </h2>
                    <h2>
                        VERDE para CONFIRMAR seu voto
                    </h2>
                    <h2>
                        LARANJA para REINICIAR seu voto
                    </h2>
                </div>
            </div>
                `
                this.botaoBrancoEL.style.display = 'none'
                this.visorEL.style.display = 'none'
                this.visorCandidatoEL.style.display = 'flex'

                break;

            default:
                break;
        }

    }

    criarCandidatos() {
        localStorage.setItem('candidatos', JSON.stringify(this.candidatos))
    }

    buscarCandidatos() {
        let candidatos = JSON.parse(localStorage.getItem('candidatos'))
        return candidatos
    }

    limparVoto() {
        this.primeiroNumero.innerText = ''
        this.segundoNumero.innerText = ''
    }

}

window.App = new Teclado()