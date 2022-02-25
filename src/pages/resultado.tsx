import styles from "../styles/Resultados.module.css"
import { useRouter } from "next/router"
import Estatisticas from "../components/Estatistica"
import Botao from "../components/Botao"

export default function resultado() {
    const router = useRouter()
    const total = +router.query.total
    const certas = +router.query.certas
    const percentual = Math.round((certas / total) * 100)


    return (
        <div className={styles.resultados}>
            <h1>Resultado Final</h1>
            <div className={styles.alinhamento}>
                <Estatisticas texto="Perguntas: " valor={total} />
                <Estatisticas texto="Certas: " valor={certas} corFundo="#9cd2a4" />
                <Estatisticas texto="Percentual: " valor={`${percentual}%`} corFundo="#de6a33"/>
            </div>
            <Botao href="/" texto="TENTAR NOVAMENTE" /> 
        </div>
    )
}