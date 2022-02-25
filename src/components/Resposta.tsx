import RespostasModel from "../model/resposta";
import styles from "../styles/Respostas.module.css"
import Questao from "./Questao";

interface RespostaProps {
    valor: RespostasModel
    indice: number
    letra: string
    corFundoLetra: string
    respostaFornecida: (indice: number) => void
}

export default function Resposta(props: RespostaProps) {
    const resposta = props.valor
    const respostaRevelada = resposta.revelada ? styles.respostaRevelada : ''
    return (

        <div className={styles.resposta}
            onClick={() => props.respostaFornecida(props.indice)}>
            <div className={`${respostaRevelada} ${styles.conteudoresposta}`}>

                <div className={styles.frente}>
                    <div className={styles.letras}
                        style={{ backgroundColor: props.corFundoLetra }}>
                        {props.letra}
                    </div>
                    <div className={styles.valor}>
                        {resposta.valor}
                    </div>
                </div>
                <div className={styles.verso}>
                    {resposta.certa ? (

                        <div className={styles.certa}>
                            <div>A resposta certa é ...</div>
                            <div className={styles.valor}>{resposta.valor}</div>
                        </div>
                    ) : (
                        <div className={styles.errada}>
                            <div>A respostaInformada esta errada...</div>
                            <div className={styles.valor}>{resposta.valor}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}