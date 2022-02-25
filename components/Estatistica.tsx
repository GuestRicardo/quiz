import styles from "../styles/Estatisticas.module.css"

interface EstatisticasProps {
    valor: any
    texto: string
    corFundo?: string
    corFonte?: string

}

export default function Estatisticas(props: EstatisticasProps) {
    return (
        <div className={styles.estatisticas}>
            <div className={styles.valor} style={{
                backgroundColor: props.corFundo ?? '#fdd60f',
                color: props.corFonte ?? '#333'
            }}>
                {props.valor}
            </div>
            <div className={styles.texto}>
                {props.texto}
            </div>
        </div>
    )
}