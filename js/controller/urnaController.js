import Candidato from '../model/canditato.js'

class urnaController {
    constructor() {

        this.tecladoNumericoEL = document.querySelectorAll('.botao-numerico')
        this.tecladoDeAcoesEL = document.querySelectorAll('.botao-acao')
        this.visorEL = document.querySelector('.visor')
        this.visorConfirmacaoEL = document.querySelector('.visor-confirmacao')
        this.primeiroInputNumericoEl = document.querySelector('.primeiro-numero')
        this.segundoInputNumericoEl = document.querySelector('.segundo-numero')
        this.visorCandidatoEL = document.querySelector('.visorCandidato')
        this.botaoBrancoEL = document.querySelector('.botao-branco')
        this.visorConfirmacaoCandidatoEL = document.querySelector('.visor-confirmacao-candidato')


        this.criarCandidatos()
        this.observadorTecladoNumerico()
        this.observadorTecladodeAcoes()

    }

    limparInputs() {
        this.primeiroInputNumericoEl.innerText = ''
        this.segundoInputNumericoEl.innerText = ''
    }

    iniciarProcesso(parametro) {

        if (parametro === "BRANCO") {

            let confirmacao = confirm(`tem certeza que deseja votar em ${parametro}`)

            if (confirmacao) {

                this.visorEL.style.display = 'none'
                this.visorConfirmacaoEL.style.display = 'block'

                setTimeout(() => {
                    this.visorConfirmacaoEL.style.display = 'none'
                    this.visorEL.style.display = 'flex'
                }, 4000);

                this.limparInputs()
            }

        }

        if (parametro === 'CORRIGE') {
            
            this.visorCandidatoEL.style.display = 'none'

            this.limparInputs()

            this.visorEL.style.display = 'flex'

            this.botaoBrancoEL.style.display = 'flex'
        }

        if (parametro === "CONFIRMA") {

            this.visorConfirmacaoCandidatoEL.innerHTML = `
            <div>
                <h1>
                 Obrigado por votar, seu voto para Presidente da Galáxia foi computado.
                </h1>
            </div>
            `

            this.visorEL.style.display = 'none'
            this.visorCandidatoEL.style.display = 'none'
            this.visorConfirmacaoCandidatoEL.style.display = 'block'

            setTimeout(() => {
                this.visorConfirmacaoCandidatoEL.style.display = 'none'
                this.visorEL.style.display = 'flex'
                this.botaoBrancoEL.style.display = 'flex'
            }, 4000);

            this.limparInputs()

        }

        if (typeof (parametro) === 'number') {

            let primeiroInput = this.primeiroInputNumericoEl
            let segundoInput = this.segundoInputNumericoEl

            if (primeiroInput.innerText == "") {
                primeiroInput.innerText = parametro
            } else {
                segundoInput.innerText = parametro

                let votoMontado = Object.assign({}, [this.primeiroInputNumericoEl.innerText, this.segundoInputNumericoEl.innerText])

                this.renderizarCandidatos(votoMontado)
            }
        }

    }

    renderizarCandidatos(parametro) {

        let votoComputado = ''
        let candidatosExistentes = this.buscarCandidatos()
        let candidatoVotado = ''

        for (const key in parametro) {
            votoComputado += parametro[key]
        }

        candidatosExistentes.map(candidato => {
            if (candidato.numero == votoComputado) {
                candidatoVotado = candidato
            }
        })

        this.visorCandidatoEL.innerHTML = `
         <div class = 'titulo-do-visor'>
            <h1 style = 'width: 70%'>Presidente da Galáxia</h1>
            <img  src = ${candidatoVotado.img} style = 'width: 20%'>
         </div>
         <hr>
         <div style = 'margin: 15px;'> 
            <span>Nome do candidato: ${candidatoVotado.nome} </span>
         </div >
         <div style = 'margin: 15px;'> 
            <span>Numero do candidato: ${candidatoVotado.numero} </span>
         </div>
         <div style = 'margin: 15px;'> 
            <span>Legenda do candidato: ${candidatoVotado.legenda} </span>
         </div>
         <hr>
         <div>
            <h2> 
                Aperte CORRIGE para REINICAR seu voto
            </h2>
            <h2> 
                Aperte CONFIRMAR para CONCLUIR seu voto
            </h2>
         </div>
        
        `

        this.visorEL.style.display = 'none'
        this.visorCandidatoEL.style.display = 'block'
        this.botaoBrancoEL.style.display = 'none'

    }

    observadorTecladoNumerico() {

        this.tecladoNumericoEL.forEach(botao => {
            botao.addEventListener('click', e => {
                let parametroNumerico = Number(e.target.innerText)

                this.iniciarProcesso(parametroNumerico)
            })
        })

    }

    observadorTecladodeAcoes() {
        this.tecladoDeAcoesEL.forEach(botao => {
            botao.addEventListener('click', e => {
                let parametro = e.target.innerText
                this.iniciarProcesso(parametro)
            })
        })
    }

    criarCandidatos() {

        let candidatos = [
            new Candidato('Darth Vader', 'sith', '99', '../../img/darthVader.png'),
            new Candidato('Leia Organa', 'resistencia', '30', '../../img/leiaOrgana-removebg-preview.png'),
            new Candidato('Obi Wan Kenobi', 'jedi', '50', '../../img/obiWan.png')
        ]

        localStorage.setItem('candidatos', JSON.stringify(candidatos))
    }

    buscarCandidatos() {
        let canditatosBuscados = JSON.parse(localStorage.getItem('candidatos'))

        return canditatosBuscados
    }

}

window.App = new urnaController()