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

  async function CarregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)//faz chamadas http para o servidor
    const json = await resp.json()
    const novaQuestao = QuestaoModel.CriarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }

  useEffect(() => {
    CarregarIdsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && CarregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function QuestaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))

  }

  function IdProximaPergunta() {
   
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1 //indexOf faz a busca do id e mostra o elemento
      return idsDasQuestoes[proximoIndice]
 
  }

  function IrPraProximoPasso() {
    const proximoId = IdProximaPergunta()
    proximoId ? IrPraProximaQuestao(proximoId) : finalizar()
  }

  function IrPraProximaQuestao(proximoId: number) {
    CarregarQuestao(proximoId)
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
      ultima={IdProximaPergunta() === undefined}
      questaoRespondida={QuestaoRespondida}
      irPraProximoPasso={IrPraProximoPasso}
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
