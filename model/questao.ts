import { Embaralhar } from "../functions/arrays"
import RespostasModel from "./resposta"


export default class QuestaoModel {
    #id: number
    #enunciado: string
    #respostas: RespostasModel[]
    #acertou: boolean


    constructor(id: number, enunciado: string, resposta: RespostasModel[], acertou = false) {
        this.#id = id
        this.#enunciado = enunciado
        this.#respostas = resposta
        this.#acertou = acertou
    }
    get id() {
        return this.#id
    }
    get enunciado() {
        return this.#enunciado
    }
    get respostas() {
        return this.#respostas
    }
    get acertou() {
        return this.#acertou
    }
    get respondida() {
        for (let resposta of this.#respostas) {
            if (resposta.revelada) return true
        }
        return false
    }
    get naoRespondida(){
        return !this.respondida
    }
    //verifica se o usuario acertou a resposta
    responderPergunta(indice: number): QuestaoModel {
        const acertou = this.#respostas[indice]?.certa
        const respostas = this.#respostas.map((resposta, i) => {
            const respostaSelecionada = indice === i
            const deveRevelar = respostaSelecionada || resposta.certa
            return deveRevelar ? resposta.revelar() : resposta

        })
        return new QuestaoModel (this.id, this.enunciado, respostas, acertou)//nesse cenario esta sendo pego os ids dessa propria instancia
    }

    embaralharRespostas() {
        let respostasEmbaralhadas = Embaralhar(this.#respostas)//para instanciar, aq esta sendo mudado a ordem das respostas q esta no valor inicial.
        return new QuestaoModel(this.#id, this.#enunciado, respostasEmbaralhadas, this.#acertou)
    }

    static CriarUsandoObjeto(obj:QuestaoModel): QuestaoModel{
        const respostas= obj.respostas.map(resp=> RespostasModel.criarUsandoObjeto(resp))
        return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou)
    }

    ConverterParaObjeto() {
        return {
            id: this.#id,
            enunciado: this.#enunciado,
            respostas: this.#respostas.map(resp => resp.ConverterParaObjeto()),
            acertou: this.#acertou
        }
    }
}

