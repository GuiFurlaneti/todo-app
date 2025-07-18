import React, { useState, useEffect } from 'react';
import ListaTarefas from './components/ListaTarefas';
import FormularioTarefa from './components/FormularioTarefa';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  const [modoEdicao, setModoEdicao] = useState(false);
  const [indiceEditando, setIndiceEditando] = useState(null);
  const [telaAtual, setTelaAtual] = useState('inicio'); // 'inicio', 'adicionar', 'concluidas'

  const [mensagem, setMensagem] = useState('');

  const prioridades = { alta: 3, media: 2, baixa: 1 };

  const adicionarTarefa = () => {
    if (novaTarefa.titulo.trim() === '') return;

    if (modoEdicao) {
      const novasTarefas = [...tarefas];
      novasTarefas[indiceEditando] = { ...novasTarefas[indiceEditando], ...novaTarefa };
      setTarefas(novasTarefas);
      setModoEdicao(false);
      setIndiceEditando(null);

      setMensagem(modoEdicao ? 'Tarefa atualizada!' : 'Tarefa adicionada com sucesso!');

      setTimeout(() => {
        setMensagem('');
      }, 3000);
      
    } else {
      const nova = {
        id: Date.now(),
        ...novaTarefa,
        concluida: false,
      };
      setTarefas([...tarefas, nova]);

      setMensagem(modoEdicao ? 'Tarefa atualizada!' : 'Tarefa adicionada com sucesso!');

      // Limpa a mensagem depois de 3 segundos
      setTimeout(() => {
        setMensagem('');
      }, 3000);
    }

    setNovaTarefa({
      titulo: '',
      descricao: '',
      prioridade: 'media',
      dataLimite: '',
    });

    setTelaAtual('inicio'); // volta para tela inicial após adicionar

    setNovaTarefa({
  titulo: '',
  descricao: '',
  prioridade: 'media',
  dataLimite: '',
});

setTelaAtual('inicio');

  };

const marcarComoConcluida = (id) => {
  setTarefas((tarefasAnteriores) =>
    tarefasAnteriores.map((tarefa) =>
      tarefa.id === id
        ? { ...tarefa, concluida: !tarefa.concluida }
        : tarefa
    )
  );
};

const removerTarefa = (id) => {
  const confirmar = window.confirm('Tem certeza que deseja excluir esta tarefa?');
  if (confirmar) {
    setTarefas((tarefasAnteriores) => tarefasAnteriores.filter((t) => t.id !== id));
  }
};

const editarTarefa = (id) => {
  const tarefaSelecionada = tarefas.find((t) => t.id === id);
  setNovaTarefa({
    titulo: tarefaSelecionada.titulo,
    descricao: tarefaSelecionada.descricao,
    prioridade: tarefaSelecionada.prioridade,
    dataLimite: tarefaSelecionada.dataLimite,
  });
  setIndiceEditando(id);
  setModoEdicao(true);
  setTelaAtual('adicionar');
};



  return (
    <main className="app-container">
      <h1>Olá, Gui! ☀️</h1>
      <p>Que hoje seja um dia muito produtivo</p>
      {mensagem && <div className="mensagem">{mensagem}</div>}


    {telaAtual === 'inicio' && (
      <div className="tela-inicio">
        <div className="coluna">
          <h2>Atrasada</h2>
          <ListaTarefas
            tarefas={tarefas.filter(t => !t.concluida && t.dataLimite && new Date(t.dataLimite) < new Date())}
            marcarComoConcluida={marcarComoConcluida}
            removerTarefa={removerTarefa}
            editarTarefa={editarTarefa}
          />
        </div>

        <div className="coluna">
          <h2>Hoje ({new Date().toLocaleDateString('pt-BR')})</h2>
          <ListaTarefas
            tarefas={tarefas.filter(t => {
              const hoje = new Date().toISOString().split('T')[0];
              return !t.concluida && t.dataLimite?.startsWith(hoje);
            })}
            marcarComoConcluida={marcarComoConcluida}
            removerTarefa={removerTarefa}
            editarTarefa={editarTarefa}
          />
        </div>
      </div>
    )}

      {telaAtual === 'adicionar' && (
        <div className="modal-overlay">
          <div className="modal-conteudo">
            <button className="fechar-modal" onClick={() => setTelaAtual('inicio')}>
              ✖
            </button>
            <FormularioTarefa
              novaTarefa={novaTarefa}
              setNovaTarefa={setNovaTarefa}
              adicionarTarefa={adicionarTarefa}
              modoEdicao={modoEdicao}
            />
          </div>
        </div>
      )}

      {telaAtual === 'concluidas' && (
        <>
          <h2>Tarefas Concluídas</h2>
          <ListaTarefas
            tarefas={tarefas.filter(t => t.concluida)}
            marcarComoConcluida={marcarComoConcluida}
            removerTarefa={removerTarefa}
            editarTarefa={editarTarefa}
          />
        </>
      )}

      <div className="menu-inferior">
        <button
          className={telaAtual === 'inicio' ? 'ativo' : ''}
          onClick={() => setTelaAtual('inicio')}
        >
          <div><i class="bi bi-house-door-fill"></i></div>
          <span>Início</span>
        </button>
        <button
          className={telaAtual === 'adicionar' ? 'ativo' : ''}
          onClick={() => setTelaAtual('adicionar')}
        >
          <div><i class="bi bi-plus-circle"></i></div>
          <span>Adicionar</span>
        </button>
        <button
          className={telaAtual === 'concluidas' ? 'ativo' : ''}
          onClick={() => setTelaAtual('concluidas')}
        >
          <div><i class="bi bi-check2-circle"></i></div>
          <span>Tarefas</span>
        </button>
      </div>
    </main>
  );
}

export default App;
