import QuestaoModel from "../model/questao";
import styles from "../styles/Questionario.module.css"
import Botao from "./Botao";
import Questao from "./Questao";

interface questionarioProps {
    questao: QuestaoModel
    ultima: boolean
    questaoRespondida: (questao: QuestaoModel) => void
    irPraProximoPasso: () => void
}

export default function Questionario(props: questionarioProps) {

    function respostaFornecida(indice: number) {
        if (props.questao.naoRespondida) {
            props.questaoRespondida(props.questao.responderPergunta(indice))
        }
    }

    return (
        <div className={styles.questionario}>
            {props.questao ?
                <Questao
                    valor={props.questao}
                    tempoParaResposta={6}
                    respostaFornecida={respostaFornecida}
                    TempoEsgotado={props.irPraProximoPasso} />
                : false
            }
            <Botao onClick={props.irPraProximoPasso}
                texto={props.ultima ? 'Finalizar' : 'Proxima'} />
        </div>
    )
}