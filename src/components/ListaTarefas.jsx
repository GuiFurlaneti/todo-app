import Tarefa from './Tarefa';
import './ListaTarefas.css';

function ListaTarefas({ tarefas, marcarComoConcluida, removerTarefa, editarTarefa }) {
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
