import Tarefa from './Tarefa';
import './ListaTarefas.css';

function ListaTarefas({ tarefas, marcarComoConcluida, removerTarefa }) {
  return (
    <ul className="lista-tarefas">
      {tarefas.map((tarefa, index) => (
        <li key={index}>
          <Tarefa
            tarefa={tarefa}
            index={index}
            marcarComoConcluida={marcarComoConcluida}
            removerTarefa={removerTarefa}
          />
        </li>
      ))}
    </ul>
  );
}

export default ListaTarefas;
