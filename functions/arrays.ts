/**FUNÇÃO PARA FAZER O EMBARALHAMENTO DAS QUESTÕESe*/
export function Embaralhar(elementos: any[]): any[] {
    return elementos
        .map(valor => ({ valor, aleatorio: Math.random() }))//aq esta sendo criado um objeto q pega o numero(id da pergunta) e um numero aleatorio, q sera gerado pelo Match.random

        .sort((obj1, obj2) => obj1.aleatorio - obj2.aleatorio)//aq esta sendo organizado os 2 objetos criado no map anterior, ele esta sendo diminuido obj1 - obj2 para q seja organizado de modo crescente

        .map(obj => obj.valor)//aq esta sendo restaurado o valor dos numeros, passado no inicio, com a sequencia diferente
}