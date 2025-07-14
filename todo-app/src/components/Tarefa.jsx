import './Tarefa.css';

function Tarefa({ tarefa, index, marcarComoConcluida, removerTarefa }) {
  return (
    <div className={`tarefa ${tarefa.concluida ? 'concluida' : ''}`}>
      <span>{tarefa.texto}</span>
      <div className="tarefa-botoes">
        <button onClick={() => marcarComoConcluida(index)}>✅</button>
        <button onClick={() => removerTarefa(index)}>🗑</button>
      </div>
    </div>
  );
}

export default Tarefa;
