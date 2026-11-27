import './Tarefa.css';
import { estaAtrasada as calcularAtraso, formatarDataLonga } from '../utils/datas';

const ROTULO_PRIORIDADE = { alta: 'Prioridade alta', media: 'Prioridade média', baixa: 'Prioridade baixa' };

function Tarefa({ tarefa, id, marcarComoConcluida, removerTarefa, editarTarefa }) {
  // Data comparada no fuso local: antes, `new Date('AAAA-MM-DD')` era interpretada em UTC,
  // exibia o dia anterior e marcava como atrasada uma tarefa do próprio dia.
  const atrasada = calcularAtraso(tarefa);

  const corPrioridade =
    tarefa.prioridade === 'alta'
      ? 'prioridade-alta'
      : tarefa.prioridade === 'media'
      ? 'prioridade-media'
      : 'prioridade-baixa';

  const editarPeloTeclado = (evento) => {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      editarTarefa(id);
    }
  };

  return (
    <div className={`tarefa-card ${tarefa.concluida ? 'concluida' : ''}`}>
      <button
        type="button"
        className={`status-bolinha ${tarefa.concluida ? 'ativa' : ''}`}
        aria-pressed={tarefa.concluida}
        aria-label={tarefa.concluida ? `Reabrir tarefa: ${tarefa.titulo}` : `Concluir tarefa: ${tarefa.titulo}`}
        onClick={(e) => {
          e.stopPropagation();
          marcarComoConcluida(id);
        }}
      ></button>

      <div
        className="tarefa-conteudo"
        role="button"
        tabIndex={0}
        aria-label={`Editar tarefa: ${tarefa.titulo}`}
        onClick={() => editarTarefa(id)}
        onKeyDown={editarPeloTeclado}
      >
        <strong>{tarefa.titulo}</strong>
        {tarefa.descricao && <p>{tarefa.descricao}</p>}
        {tarefa.dataLimite && (
          <span className={`data-limite ${atrasada ? 'atrasada' : ''}`}>
            {formatarDataLonga(tarefa.dataLimite)}
            {atrasada && <span className="sr-only"> (atrasada)</span>}
          </span>
        )}
        <span className="sr-only">{ROTULO_PRIORIDADE[tarefa.prioridade]}</span>
      </div>

      <div className={`faixa-prioridade ${corPrioridade}`} aria-hidden="true"></div>

      <button
        type="button"
        className="faixa-deletar"
        aria-label={`Excluir tarefa: ${tarefa.titulo}`}
        onClick={(e) => {
          e.stopPropagation();
          removerTarefa(id);
        }}
      >
        <i className="bi bi-trash3-fill" aria-hidden="true"></i>
      </button>
    </div>
  );
}

export default Tarefa;
