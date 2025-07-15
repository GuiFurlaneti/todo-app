import React, { useState } from 'react'; // importa useState
import ListaTarefas from './components/ListaTarefas';
import './App.css';


function App() {
  const [novaTarefa, setNovaTarefa] = useState({
    titulo: '',
    descricao: '',
    prioridade: 'media',
    dataLimite: '',
  });
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem('tarefas');
    return salvas ? JSON.parse(salvas) : [];
  });
  React.useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);
  const [filtro, setFiltro] = useState('todas'); // 'todas', 'pendentes' ou 'concluidas'



  // Função que é chamada ao clicar em "Adicionar"
const adicionarTarefa = () => {
  if (novaTarefa.titulo.trim() === '') return;

  if (modoEdicao) {
    const novasTarefas = [...tarefas];
    novasTarefas[indiceEditando] = {
      ...novasTarefas[indiceEditando],
      ...novaTarefa,
    };
    setTarefas(novasTarefas);
    setModoEdicao(false);
    setIndiceEditando(null);
  } else {
    const nova = {
      id: Date.now(),
      ...novaTarefa,
      concluida: false,
    };
    setTarefas([...tarefas, nova]);
  }

  // Limpa os campos
  setNovaTarefa({
    titulo: '',
    descricao: '',
    prioridade: 'media',
    dataLimite: '',
  });
};


  function marcarComoConcluida(index) {
  const novasTarefas = [...tarefas];
  const tarefaAtual = novasTarefas[index];
  tarefaAtual.concluida = !tarefaAtual.concluida;
  setTarefas(novasTarefas);
}

function removerTarefa(index) {
  const novasTarefas = tarefas.filter((_, i) => i !== index);
  setTarefas(novasTarefas);
}

const tarefasFiltradas = tarefas.filter((tarefa) => {
  const agora = new Date();

  if (filtro === 'pendentes') return !tarefa.concluida;

  if (filtro === 'concluidas') return tarefa.concluida;

  if (filtro === 'atrasadas') {
    return (
      !tarefa.concluida &&
      tarefa.dataLimite &&
      new Date(tarefa.dataLimite) < agora
    );
  }

  return true; // todas
});

const prioridades = { alta: 3, media: 2, baixa: 1 };

const tarefasOrdenadas = [...tarefasFiltradas].sort((a, b) => {
  return prioridades[b.prioridade] - prioridades[a.prioridade];
});

const [modoEdicao, setModoEdicao] = useState(false); // estamos editando?
const [indiceEditando, setIndiceEditando] = useState(null); // qual tarefa está sendo editada?

function editarTarefa(index) {
  const tarefaSelecionada = tarefas[index];
  setNovaTarefa({
    titulo: tarefaSelecionada.titulo,
    descricao: tarefaSelecionada.descricao,
    prioridade: tarefaSelecionada.prioridade,
    dataLimite: tarefaSelecionada.dataLimite
  });
  setIndiceEditando(index);
  setModoEdicao(true);
}

const [telaAtual, setTelaAtual] = useState('inicio'); // 'inicio', 'adicionar', 'concluidas'

<div className="menu-inferior">
  <button onClick={() => setTelaAtual('inicio')}>Início</button>
  <button onClick={() => setTelaAtual('adicionar')}>Adicionar Tarefa</button>
  <button onClick={() => setTelaAtual('concluidas')}>Tarefas</button>
</div>

  return (
    <main className="app-container">
      <h1>Minhas Tarefas</h1>

      {/* Campo de texto e botão */}
      <div className="form-tarefa">
    <input
      type="text"
      placeholder="Título da tarefa"
      value={novaTarefa.titulo}
      onChange={(e) =>
        setNovaTarefa({ ...novaTarefa, titulo: e.target.value })
      }
    />

    <textarea
      placeholder="Descrição (opcional)"
      value={novaTarefa.descricao}
      onChange={(e) =>
        setNovaTarefa({ ...novaTarefa, descricao: e.target.value })
      }
    />

    <select
      value={novaTarefa.prioridade}
      onChange={(e) =>
        setNovaTarefa({ ...novaTarefa, prioridade: e.target.value })
      }
    >
      <option value="baixa">Baixa</option>
      <option value="media">Média</option>
      <option value="alta">Alta</option>
    </select>

    <input
      type="datetime-local"
      value={novaTarefa.dataLimite}
      onChange={(e) =>
        setNovaTarefa({ ...novaTarefa, dataLimite: e.target.value })
      }
    />


    <button onClick={adicionarTarefa}>Adicionar</button>

      </div>

      <div className="filtros">
      <button onClick={() => setFiltro('todas')}>Todas</button>
      <button onClick={() => setFiltro('atrasadas')}>Atrasadas</button>
      <button onClick={() => setFiltro('pendentes')}>Pendentes</button>
      <button onClick={() => setFiltro('concluidas')}>Concluídas</button>
    </div>

      <ListaTarefas
        tarefas={tarefasOrdenadas}
        marcarComoConcluida={marcarComoConcluida}
        removerTarefa={removerTarefa}
        editarTarefa={editarTarefa}
      />
{telaAtual === 'inicio' && (
  <>
    <h2>Tarefas do dia</h2>
    {/* lista tarefas de hoje */}
  </>
)}

{telaAtual === 'adicionar' && (
  <>
    <h2>{modoEdicao ? 'Editar Tarefa' : 'Adicionar Tarefa'}</h2>
    {/* formulário de inputs */}
  </>
)}

{telaAtual === 'concluidas' && (
  <>
    <h2>Tarefas Concluídas</h2>
    {/* lista apenas tarefas concluídas */}
  </>
)}

  

    </main>
  );
}

export default App;
