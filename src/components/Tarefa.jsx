import './Tarefa.css';

function Tarefa({ tarefa, index, marcarComoConcluida, removerTarefa, editarTarefa }) {
  // Verifica se está atrasada
  const estaAtrasada = tarefa.dataLimite && new Date(tarefa.dataLimite) < new Date() && !tarefa.concluida;

  return (
  <li
    className={`tarefa ${tarefa.concluida ? 'concluida' : ''}`}
  >
    <div>
      <strong>{tarefa.titulo}</strong>
      {tarefa.descricao && (
        <p style={{ fontSize: '1rem' }}>
          {tarefa.descricao}
        </p>
      )}
      <span className={`prioridade ${tarefa.prioridade}`}>
        Prioridade: {tarefa.prioridade}
      </span>
      {tarefa.dataLimite && (
        <div className={`data-limite`}>
          {new Date(tarefa.dataLimite).toLocaleString('pt-BR')}
        </div>
      )}
    </div>

    <div className="tarefa-botoes">
      <button onClick={() => marcarComoConcluida(index)}>✅</button>
      <button onClick={() => removerTarefa(index)}>🗑️</button>
      <button onClick={() => editarTarefa(index)}>✏️</button>
    </div>
  </li>

  );
}

export default Tarefa;
