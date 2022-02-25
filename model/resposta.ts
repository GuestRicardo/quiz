export default class RespostasModel {
    #valor: string
    #certa: boolean
    #revelada: boolean

    constructor(valor: string, certa: boolean, revelada = false) {
        this.#valor = valor
        this.#certa = certa
        this.#revelada = revelada
    }
    static certa(valor: string) {//Os métodos estáticos são chamados de "estáticos" porque são resolvidos em tempo de compilação (estaticamente), com base na classe em que são chamados, e não dinamicamente, como no caso dos métodos de instância, que são resolvidos polimorficamente com base no tipo de tempo de execução do objeto.
        return new RespostasModel(valor, true)
    }
    static errada(valor: string) {
        return new RespostasModel(valor, false)
    }

    get valor() {
        return this.#valor
    }
    get certa() {
        return this.#certa
    }
    get revelada() {
        return this.#revelada
    }

    revelar() {//metodo para revelar a resposta de qualquer forma
        return new RespostasModel(this.#valor, this.#certa, true)
    }

    //quando usa o static é possivel chamar diretamente na classe sem precisar instanciar
    static criarUsandoObjeto(obj): RespostasModel{
        return new RespostasModel(obj.valor, obj.certa, obj.revelada)
    }

    ConverterParaObjeto() {
        return {
            valor: this.#valor,
            certa: this.#certa,
            revelada: this.#revelada

        }
    }
}