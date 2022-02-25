import questoes from "../questoes/bancoDeQuestoes"
import { Embaralhar } from "../../../functions/arrays"

export default (req, res) => {//para exibir os ids em ordem aleatoria
    const ids = questoes.map(questoes => questoes.id)
    res.status(200).json(Embaralhar(ids))
}
