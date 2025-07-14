import React, { useState } from 'react'; // importa useState
import TarefaCard from './components/TarefaCard';

function App() {
  const [novaTarefa, setNovaTarefa] = useState(''); // armazena o texto digitado
  const [tarefas, setTarefas] = useState([]); // armazena a lista de tarefas

  // Função que é chamada ao clicar em "Adicionar"
  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return; // não adiciona se estiver vazio

    // Cria objeto com id, texto e status
    const tarefa = {
      id: Date.now(), // gera um id único com timestamp
      titulo: novaTarefa,
      concluida: false
    };

    // Atualiza lista de tarefas
    setTarefas([
  ...tarefas,
  { texto: novaTarefa, concluida: false }
]);
    setNovaTarefa(''); // limpa o input
  };

  function marcarComoConcluida(index) {
  const novasTarefas = [...tarefas];
  novasTarefas[index].concluida = true;
  setTarefas(novasTarefas);
}

function removerTarefa(index) {
  const novasTarefas = tarefas.filter((_, i) => i !== index);
  setTarefas(novasTarefas);
}


  return (
    <main className="app-container">
      <h1>Minhas Tarefas</h1>

      {/* Campo de texto e botão */}
      <div className="form-tarefa">
        <input
          type="text"
          placeholder="Digite sua tarefa..."
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)} // atualiza novaTarefa
        />
        <button onClick={adicionarTarefa}>Adicionar</button>
      </div>

      {/* Lista de tarefas renderizada com map */}
      {tarefas.map((tarefa, index) => (
  <div key={index}>
    <span style={{
      textDecoration: tarefa.concluida ? "line-through" : "none"
    }}>
      {tarefa.texto}
    </span>

    <button onClick={() => marcarComoConcluida(index)}>
      ✅
    </button>

    <button onClick={() => removerTarefa(index)}>
      🗑
    </button>
  </div>
))}


    </main>
  );
}

export default App;
