import { useEffect, useState } from 'react'
import QuestaoModel from '../model/questao'
import Questionario from '../components/Questionario'
import { useRouter } from 'next/router'




const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()

  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)
  //const questaoRef = useRef<QuestaoModel>()

  async function CarregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)//faz chamadas http para o servidor
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)//faz chamadas http para o servidor
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    CarregarIdsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))

  }

  function idProximaPergunta() {
   
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1 //indexOf faz a busca do id e mostra o elemento
      return idsDasQuestoes[proximoIndice]
 
  }

  function irPraProximoPasso() {
    const proximoId = idProximaPergunta()
    proximoId ? irPraProximaQuestao(proximoId) : finalizar()
  }

  function irPraProximaQuestao(proximoId: number) {
    carregarQuestao(proximoId)
  }

  function finalizar() {
    router.push({
      pathname: "/resultado",
      query:{
        total:idsDasQuestoes.length,
        certas: respostasCertas
      }

    })
  }

  return questao ?(
    <Questionario
      questao={questao}
      ultima={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irPraProximoPasso={irPraProximoPasso}
    />
  ) : false
}


/* useEffect(() => {
   questaoRef.current = questao
 }, [questao])

 //estado
 function respostaFornecida(indice: number) {
   setQuestao(questao.responderPergunta(indice))
 }

 function TempoEsgotado() {
   if (questaoRef.naoRespondida) {
     setQuestao(questaoRef.current.responderPergunta(-1))
   }
 }*/



/* <div style={{
  display: "flex",
  height: "100hv",
  justifyContent: "center",
  alignItems: "center",
  flexDirection:"column"
}}>
*  <Questao valor={questao}
    tempoParaResposta={5}
    respostaFornecida={respostaFornecida}
  /*TempoEsgotado={TempoEsgotado}/>
  <Botao texto="Proxima questão" href='/resultado' />*/
