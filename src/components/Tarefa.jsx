import './Tarefa.css';

function Tarefa({ tarefa, index, marcarComoConcluida, removerTarefa, editarTarefa }) {
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
      {/* Bolinha de status (toggle de conclusão) */}
      <div
        className={`status-bolinha ${tarefa.concluida ? 'ativa' : ''}`}
        onClick={(e) => {
          e.stopPropagation(); // evita cliques indesejados em outros elementos
          marcarComoConcluida(index);
        }}
      ></div>

      {/* Conteúdo clicável para editar */}
      <div
        className="tarefa-conteudo"
        onClick={() => editarTarefa(index)} // só o conteúdo abre a edição
      >
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

      {/* Faixa lateral de prioridade */}
      <div className={`faixa-prioridade ${corPrioridade}`}></div>
    </div>
  );
}

export default Tarefa;
