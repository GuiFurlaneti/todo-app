import Tarefa from './Tarefa';
import './ListaTarefas.css';

function ListaTarefas({ tarefas, vazio, marcarComoConcluida, removerTarefa, editarTarefa }) {
  if (tarefas.length === 0 && vazio) {
    return <p className="lista-vazia">{vazio}</p>;
  }

  return (
    <ul className="lista-tarefas">
      {tarefas.map((tarefa) => (
        <li key={tarefa.id}>
          <Tarefa
            tarefa={tarefa}
            id={tarefa.id}
            marcarComoConcluida={marcarComoConcluida}
            removerTarefa={removerTarefa}
            editarTarefa={editarTarefa}
          />
        </li>
      ))}
    </ul>
  );
}

export default ListaTarefas;
