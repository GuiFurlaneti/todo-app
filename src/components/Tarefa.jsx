import './Tarefa.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Tarefa({ tarefa, id, marcarComoConcluida, removerTarefa, editarTarefa }) {
  const estaAtrasada =
    tarefa.dataLimite &&
    new Date(tarefa.dataLimite) < new Date() &&
    !tarefa.concluida;

  const corPrioridade =
    tarefa.prioridade === 'alta'
      ? 'prioridade-alta'
      : tarefa.prioridade === 'media'
      ? 'prioridade-media'
      : 'prioridade-baixa';

  return (
    <div className={`tarefa-card ${tarefa.concluida ? 'concluida' : ''}`}>
      <div
        className={`status-bolinha ${tarefa.concluida ? 'ativa' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          marcarComoConcluida(id);
        }}
      ></div>

      <div className="tarefa-conteudo" onClick={() => editarTarefa(id)}>
        <strong>{tarefa.titulo}</strong>
        {tarefa.descricao && <p>{tarefa.descricao}</p>}
        {tarefa.dataLimite && (
          <span className={`data-limite ${estaAtrasada ? 'atrasada' : ''}`}>
            {new Date(tarefa.dataLimite).toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        )}
      </div>

      <div 
        className={`faixa-prioridade ${corPrioridade}`}>
      </div>


      <div
        className="faixa-deletar"
        onClick={(e) => {
          e.stopPropagation();
          removerTarefa(id);
        }}
      >
        <i className="bi bi-trash3-fill"></i>
      </div>
    </div>
  );
}

export default Tarefa;
