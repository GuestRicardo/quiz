// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import QuestaoModel from "../../../model/questao"
import questoes from "./bancoDeQuestoes"

export default function questoesProrId (req, res) {
  const idSelecionado = +req.query.id
  const unicaQuestaoOuNada = questoes.filter(questao => questao.id === idSelecionado)
  if (unicaQuestaoOuNada.length === 1) {
    const questaoSelecionada = unicaQuestaoOuNada[0].embaralharRespostas()
    res.status(200).json(questaoSelecionada.ConverterParaObjeto())
  } else {
    res.status(404).send()
  }

}
